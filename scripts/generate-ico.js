import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pngPath = path.join(__dirname, '../public/favicon-48x48.png');
const icoPath = path.join(__dirname, '../public/favicon.ico');

try {
  const pngBuffer = fs.readFileSync(pngPath);
  
  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);     // Reserved
  header.writeUInt16LE(1, 2);     // Type: 1 = ICO
  header.writeUInt16LE(1, 4);     // Number of images: 1
  
  // Directory entry: 16 bytes
  const entry = Buffer.alloc(16);
  entry.writeUInt8(48, 0);        // Width: 48
  entry.writeUInt8(48, 1);        // Height: 48
  entry.writeUInt8(0, 2);         // Color palette: 0 (no palette)
  entry.writeUInt8(0, 3);         // Reserved: 0
  entry.writeUInt16LE(1, 4);      // Color planes: 1
  entry.writeUInt16LE(32, 6);     // Bits per pixel: 32
  entry.writeUInt32LE(pngBuffer.length, 8); // Size of image data
  entry.writeUInt32LE(6 + 16, 12); // Offset of image data
  
  const icoBuffer = Buffer.concat([header, entry, pngBuffer]);
  fs.writeFileSync(icoPath, icoBuffer);
  console.log('Successfully generated valid public/favicon.ico!');
} catch (err) {
  console.error('Error generating ICO:', err);
  process.exit(1);
}
