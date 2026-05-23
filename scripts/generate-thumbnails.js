const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const SOURCE_ROOT = path.resolve(__dirname, '../src/images');
const PREVIEW_ROOT = path.resolve(__dirname, '../src/images/previews');
const TARGET_FOLDERS = ['ceramics', 'digital_art', 'music', 'physical_art'];
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

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

async function listImages(folderPath) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);
}

async function generatePreview(sourcePath, outputPath) {
  await sharp(sourcePath)
    .resize({
      width: PREVIEW_SIZE,
      height: PREVIEW_SIZE,
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: PREVIEW_QUALITY })
    .toFile(outputPath);
}

async function main() {
  let generated = 0;

  for (const folder of TARGET_FOLDERS) {
    const sourceFolder = path.join(SOURCE_ROOT, folder);
    const previewFolder = path.join(PREVIEW_ROOT, folder);

    await ensureDir(previewFolder);

    const files = await listImages(sourceFolder);
    for (const fileName of files) {
      const sourcePath = path.join(sourceFolder, fileName);
      const previewName = `${sanitizeFileBase(fileName)}-thumb.webp`;
      const outputPath = path.join(previewFolder, previewName);

      await generatePreview(sourcePath, outputPath);
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
