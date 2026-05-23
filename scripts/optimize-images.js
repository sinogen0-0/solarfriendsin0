const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const IMAGES_ROOT = path.resolve(__dirname, '../src/images');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const JPEG_QUALITY = 78;
const PNG_QUALITY = 78;

async function walk(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (SUPPORTED_EXTENSIONS.has(ext)) {
      files.push(absolute);
    }
  }

  return files;
}

function toKB(bytes) {
  return (bytes / 1024).toFixed(1);
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const original = await fs.readFile(filePath);
  const originalSize = original.byteLength;

  let pipeline = sharp(original, { failOn: 'none' });

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true });
  }

  const output = await pipeline.toBuffer();
  const optimizedSize = output.byteLength;

  if (optimizedSize >= originalSize) {
    return {
      changed: false,
      originalSize,
      optimizedSize: originalSize,
      savedBytes: 0
    };
  }

  await fs.writeFile(filePath, output);

  return {
    changed: true,
    originalSize,
    optimizedSize,
    savedBytes: originalSize - optimizedSize
  };
}

async function main() {
  const files = await walk(IMAGES_ROOT);

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  let totalSavedBytes = 0;
  let changedCount = 0;

  for (const file of files) {
    try {
      const result = await optimizeImage(file);
      totalOriginalBytes += result.originalSize;
      totalOptimizedBytes += result.optimizedSize;
      totalSavedBytes += result.savedBytes;

      if (result.changed) {
        changedCount += 1;
        const relativePath = path.relative(process.cwd(), file);
        console.log(`optimized: ${relativePath} (${toKB(result.originalSize)}KB -> ${toKB(result.optimizedSize)}KB)`);
      }
    } catch (error) {
      const relativePath = path.relative(process.cwd(), file);
      console.warn(`skipped: ${relativePath} (${error.message})`);
    }
  }

  const unchangedCount = files.length - changedCount;
  const percentSaved = totalOriginalBytes > 0
    ? ((totalSavedBytes / totalOriginalBytes) * 100).toFixed(2)
    : '0.00';

  console.log('');
  console.log(`Scanned: ${files.length} images`);
  console.log(`Optimized: ${changedCount}`);
  console.log(`Unchanged: ${unchangedCount}`);
  console.log(`Total size: ${toKB(totalOriginalBytes)}KB -> ${toKB(totalOptimizedBytes)}KB`);
  console.log(`Saved: ${toKB(totalSavedBytes)}KB (${percentSaved}%)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
