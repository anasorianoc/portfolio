import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const abogados = path.join(root, 'assets', 'abogados');
const videosDir = path.join(abogados, 'videos');
const historiasDir = path.join(abogados, 'historias');

function sizeMB(filePath) {
  return (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
}

function compressVideo(fileName) {
  const input = path.join(videosDir, fileName);
  const temp = path.join(videosDir, `.${fileName}.tmp.mp4`);

  execFileSync(
    ffmpegPath,
    [
      '-i', input,
      '-an',
      '-vf', 'scale=720:-2:flags=lanczos',
      '-c:v', 'libx264',
      '-crf', '27',
      '-preset', 'medium',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-y',
      temp,
    ],
    { stdio: 'inherit' }
  );

  const before = sizeMB(input);
  fs.renameSync(temp, input);
  const after = sizeMB(input);
  console.log(`Video ${fileName}: ${before} MB → ${after} MB`);
}

async function optimizeImages() {
  for (const file of ['img-abogados.jpg', 'antes2.jpg']) {
    const input = path.join(abogados, file);
    const temp = path.join(abogados, `.${file}.tmp`);
    const before = sizeMB(input);

    await sharp(input)
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(temp);

    fs.renameSync(temp, input);
    console.log(`Image ${file}: ${before} MB → ${sizeMB(input)} MB`);
  }

  for (const file of fs.readdirSync(historiasDir).filter(f => f.endsWith('.png'))) {
    const input = path.join(historiasDir, file);
    const output = path.join(historiasDir, file.replace(/\.png$/i, '.webp'));
    const before = (fs.statSync(input).size / 1024).toFixed(1);

    await sharp(input)
      .webp({ quality: 82, effort: 6 })
      .toFile(output);

    const after = (fs.statSync(output).size / 1024).toFixed(1);
    console.log(`Story ${file}: ${before} KB → ${file.replace('.png', '.webp')} ${after} KB`);
    fs.unlinkSync(input);
  }
}

console.log('Compressing videos…');
for (const file of fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'))) {
  compressVideo(file);
}

console.log('\nOptimizing images…');
await optimizeImages();
console.log('\nDone.');
