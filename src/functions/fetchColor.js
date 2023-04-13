const canvas = require("@napi-rs/canvas");

async function getColor(imagePath) {
  const canvasObject = canvas.createCanvas(512, 512);
  const ctx = canvasObject.getContext("2d");
  const image = await canvas.loadImage(imagePath);
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(256, 256, 1, 1);
  const data = imageData.data;

  // Get the color of the pixel at the center of the image
  const r = data[0];
  const g = data[1];
  const b = data[2];
  let color = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return color;
}

module.exports = { getColor };
