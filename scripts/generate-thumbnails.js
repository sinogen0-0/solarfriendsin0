const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

const SOURCE_ROOT = path.resolve(__dirname, '../src/images');
const PREVIEW_ROOT = path.resolve(__dirname, '../src/images/previews');
const TARGET_FOLDERS = ['ceramics', 'digital_art', 'music', 'physical_art', 'store'];
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.webm', '.m4v', '.mkv', '.avi']);
const SUPPORTED_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS]);

const PREVIEW_SIZE = 640;
const PREVIEW_QUALITY = 72;

function sanitizeFileBase(fileName) {
  const base = path.parse(fileName).name;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function listMedia(folderPath) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);
}

// Smart-crop to a square using sharp's attention-based cropping so busy/high-contrast
// focal points (faces, subjects) stay in frame instead of a plain center-crop.
async function generateImagePreview(sourcePath, outputPath) {
  await sharp(sourcePath)
    .resize({
      width: PREVIEW_SIZE,
      height: PREVIEW_SIZE,
      fit: 'cover',
      position: sharp.strategy.attention
    })
    .webp({ quality: PREVIEW_QUALITY })
    .toFile(outputPath);
}

// Extract a representative frame ~1s into the clip via ffmpeg, then run it through the same
// attention-cropped webp pipeline used for still images so video and image thumbnails look
// consistent in the grid.
function extractVideoFrame(sourcePath, framePath) {
  return new Promise((resolve, reject) => {
    ffmpeg(sourcePath)
      .on('end', resolve)
      .on('error', reject)
      .screenshots({
        timestamps: ['1'],
        filename: path.basename(framePath),
        folder: path.dirname(framePath),
        size: '?x720'
      });
  });
}

async function generateVideoPreview(sourcePath, outputPath) {
  const tempFrame = `${outputPath}.frame.png`;
  try {
    await extractVideoFrame(sourcePath, tempFrame);
    await generateImagePreview(tempFrame, outputPath);
  } finally {
    await fs.rm(tempFrame, { force: true });
  }
}

async function main() {
  let generated = 0;

  for (const folder of TARGET_FOLDERS) {
    const sourceFolder = path.join(SOURCE_ROOT, folder);
    const previewFolder = path.join(PREVIEW_ROOT, folder);

    await ensureDir(previewFolder);

    const files = await listMedia(sourceFolder);
    for (const fileName of files) {
      const sourcePath = path.join(sourceFolder, fileName);
      const previewName = `${sanitizeFileBase(fileName)}-thumb.webp`;
      const outputPath = path.join(previewFolder, previewName);
      const extension = path.extname(fileName).toLowerCase();

      if (IMAGE_EXTENSIONS.has(extension)) {
        await generateImagePreview(sourcePath, outputPath);
      } else {
        await generateVideoPreview(sourcePath, outputPath);
      }

      generated += 1;
      console.log(`generated: ${path.relative(process.cwd(), outputPath)}`);
    }
  }

  console.log('');
  console.log(`Generated thumbnails: ${generated}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
