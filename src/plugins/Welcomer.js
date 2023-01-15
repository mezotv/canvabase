const { isLight } = require("../functions/isLight");
const { getColor } = require("../functions/fetchColor");
const canva = require("@napi-rs/canvas");

class Welcomer {
  constructor() {
    this.color = "#FFFFFF"
}
  addBackground(background) {
    if (!background || typeof background !== "object") {
      throw new Error("Expected background object instead got " + typeof background);
    }
    this.background = background
    return this;
  }

  setName(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Expected name string instead got " + typeof name);
    }
    this.name = name
    return this;
}

setTitle(title) {
  if (!title || typeof title !== "string") {
    throw new Error("Expected title string instead got " + typeof title);
  }
  this.title = title
  return this;
}

setAvatar(avatar) {
  if (!avatar || typeof avatar !== "string") {
    throw new Error("Expected avatar string instead got " + typeof avatar);
  }
  this.avatar = avatar
  return this;
}

setcolor(color) {
  if (!color || typeof color !== "string") {
    throw new Error("Expected color string instead got " + typeof color);
  }
  this.color = color
  return this;
}

    async build() {

    let { background, name, color, avatar, title} = this;

    if(!background) throw new Error("No background provided in options.")
    if(!avatar) throw new Error("No avatar provided in options.")
    if(!name) throw new Error("No name provided in options.")

    if(!title) { title = "Welcome!"}


    background = background[Math.floor(Math.random() * background.length)] 

    const fetchColor = await getColor(background)
    console.log(fetchColor)

    if(!color) { color = "#FFFFFF" }
    if(isLight(fetchColor)) { color = "#111111"}

    const canvas = canva.createCanvas(800, 270);
    const ctx = canvas.getContext("2d");

    function roundImg(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function roundBackground(r) {
        roundImg(20, 20, canvas.width, canvas.height, r)
        roundImg(-20, -20, canvas.width, canvas.height, r)
        roundImg(-30, 30, canvas.width, canvas.height, r)
        ctx.clip()
        roundImg(-30, -30, canvas.width, canvas.height, r)
        ctx.clip()
        roundImg(-30, -30, canvas.width, canvas.height, r)
        ctx.clip()
        roundImg(-30, -30, canvas.width, canvas.height, r)
        roundImg(30, -30, canvas.width, canvas.height, r)
        ctx.clip()
        roundImg(30, -30, canvas.width, canvas.height, r)
        roundImg(30, 30, canvas.width, canvas.height, r)
        ctx.clip()
    }

    const fixedbkg = await canva.loadImage(background);
            roundBackground(20);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const blurImage = await canva.loadImage(
        "https://cdn.discordapp.com/attachments/796548640755023883/801045183974211614/Empty.png"
    );

    ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);

    ctx.font = `bold 40px Life`;
    ctx.fillStyle = `${color}`;
    ctx.textAlign = "start";

    const username =
        name.length > 15 ? text.substring(0, 15).trim() + "..." : name;
    ctx.fillText(`${username}`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.font = `bold 40px Life`;
    ctx.fillStyle = `${color}`;

    ctx.fillText(`${title}`,  canvas.width / 2.5, 179);

    const renderavatar = await canva.loadImage(avatar)
    ctx.shadowBlur = 10;

    ctx.drawImage(renderavatar, 50, 50, 170, 170);

    function roundPfp(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function roundBackground(r) {
        roundPfp(20, 20, canvas.width, canvas.height, r)
        roundPfp(-20, -20, canvas.width, canvas.height, r)
        roundPfp(-30, 30, canvas.width, canvas.height, r)
        ctx.clip()
        roundPfp(-30, -30, canvas.width, canvas.height, r)
        ctx.clip()
        roundPfp(-30, -30, canvas.width, canvas.height, r)
        ctx.clip()
        roundPfp(-30, -30, canvas.width, canvas.height, r)
        roundPfp(30, -30, canvas.width, canvas.height, r)
        ctx.clip()
        roundPfp(30, -30, canvas.width, canvas.height, r)
        roundPfp(30, 30, canvas.width, canvas.height, r)
        ctx.clip()
    }


    // returns the buffer
    return canvas.encode("png");
  }
}

module.exports = Welcomer;
