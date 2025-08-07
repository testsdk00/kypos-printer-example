import { Printer, Image } from '@node-escpos/core';
import USB from '@node-escpos/usb-adapter';
import nodeHtmlToImage from 'node-html-to-image';
import path from 'path';
import fs from 'fs';
const imagePath = path.resolve(process.cwd(), './image.jpg');
const htmlPath = path.resolve(process.cwd(), './src/test.html');
const htmlRaw = fs.readFileSync(htmlPath, 'utf8');

// 78mm 203 dpi => 623px
// cpl 42 : 0.87cm? : 8.7mm // 8mm -> 64px
// cpl 48 : 3mm // 3mm -> 24px

// 623px - 128px = 495px
// 623px - 48px = 575px

await nodeHtmlToImage({
  output: imagePath,
  html: htmlRaw,
  quality: 100,
  type: 'jpeg',
});

const device = new USB(0x471, 0x0055);
device.open(async function (err) {
  if (err) {
    // handle error
    return;
  }

  const image = await Image.load(imagePath);
  await printer.image(image, 'D24');
  printer.feed(3).cut().close();
});
const printer = new Printer(device, {
  encoding: 'GB18030',
});
