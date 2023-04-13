const canvas = require("@napi-rs/canvas");

async function getPixelColor(imagePath, width, height, x1, y1, x2, y2) {
  const canvasObject = canvas.createCanvas(width, height);
  const ctx = canvasObject.getContext("2d");
  const image = await canvas.loadImage(imagePath);
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(x1, y1, 1, 1);
  const data = imageData.data;

  let data2
  if(x2 && y2) {
    const imageData2 = ctx.getImageData(x2, y2, 1, 1);
    data2 = imageData2.data;
  }


  // Get the color of the pixel at the center of the image
  const r = data[0];
  const g = data[1];
  const b = data[2];
  let color = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  const r2 = data2[0];
  const g2 = data2[1];
  const b2 = data2[2];
  let color2 = `#${r2.toString(16).padStart(2, "0")}${g2
    .toString(16)
    .padStart(2, "0")}${b2.toString(16).padStart(2, "0")}`;

  return [color, color2];
}

module.exports = { getPixelColor };
