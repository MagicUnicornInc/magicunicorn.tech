import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagesDir = join(__dirname, '../src/images');

const logos = [
  'unicorn-commander-logo.png',
  'center-deep-logo.png',
  'cognitive-companion-logo.png'
];

async function optimizeLogos() {
  for (const logo of logos) {
    const inputPath = join(imagesDir, logo);
    const outputPath = join(imagesDir, logo.replace('.png', '.webp'));

    try {
      await sharp(inputPath)
        .resize(200, 200, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      const inputStats = await sharp(inputPath).metadata();
      const outputStats = await sharp(outputPath).metadata();

      console.log(`✓ ${logo}`);
      console.log(`  Resized: ${inputStats.width}x${inputStats.height} → 200x200`);

      const { size: inputSize } = await import('fs').then(fs => fs.promises.stat(inputPath));
      const { size: outputSize } = await import('fs').then(fs => fs.promises.stat(outputPath));
      console.log(`  Size: ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB (${((1 - outputSize/inputSize) * 100).toFixed(0)}% smaller)\n`);

    } catch (err) {
      console.error(`✗ Error processing ${logo}:`, err.message);
    }
  }
}

optimizeLogos();
