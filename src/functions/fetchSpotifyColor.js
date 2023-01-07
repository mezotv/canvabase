const canvas = require("@napi-rs/canvas");

const getMiddleColor = async (imagePath) => {

    const canvasObject = canvas.createCanvas(640, 640);
    const ctx = canvasObject.getContext('2d');
    const image = await canvas.loadImage(imagePath);
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(30, 30, 1, 1);
    const data = imageData.data;

    const imageData2 = ctx.getImageData(600, 569, 1, 1);
    const data2 = imageData2.data;

    // Get the color of the pixel at the center of the image
    const r = data[0];
    const g = data[1];
    const b = data[2];
    let color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    const r2 = data2[0];
    const g2 = data2[1];
    const b2 = data2[2];
    let color2 = `#${r2.toString(16).padStart(2, '0')}${g2.toString(16).padStart(2, '0')}${b2.toString(16).padStart(2, '0')}`;


   if(isLight(color)) { color = "#0F0F0F" }
   if(isLight(color2)) { color2 = "#0F0F0F" }
   
    return [color, color2];
}

export default getMiddleColor;