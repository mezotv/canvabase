const { isLight } = require('../functions/isLight');
const { getColor } = require('../functions/fetchColor');
const canva = require('@napi-rs/canvas');

/**
 * @example 
 * const welcomer = new canvabase.Welcomer()
  .setName("Dominik")
  .setTitle("Welcome!")
  .addBackgrounds(["https://wallpapercave.com/wp/wp5128415.jpg", "https://wallpapercave.com/wp/wp11735586.jpg"])
  .setAvatar("https://cdn.discordapp.com/avatars/347077478726238228/3b77f755fa8e66fd75d1e2d3fb8b1611.png?size=512", "normal")
  .setPosition("left")
  .setColor("#ffff")

  welcomer.build().then((img) => {
  canvabase.write("./test/welcomercard.png", img);
   })
  })
 */

class Welcomer {
  constructor() {
    
  }

    /**
   *
   * @param {String} color
   * @returns {String}
   */

  color = "#fff";

  /**
   *
   * @param {Array} background
   * @returns {Welcomer}
   */

  addBackgrounds(background) {
    if (!Array.isArray(background)) {
      throw new Error(
        'Expected background array instead got ' + typeof background
      );
    }
    this.background = background;
    return this;
  }

  /**
   *
   * @param {Array} name
   * @returns {Welcomer}
   */

  setName(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Expected name string instead got ' + typeof name);
    }
    this.name = name;
    return this;
  }

  /**
   *
   * @param {Array} title
   * @returns {Welcomer}
   */

  setTitle(title) {
    if (!title || typeof title !== 'string') {
      throw new Error('Expected title string instead got ' + typeof title);
    }
    this.title = title;
    return this;
  }

  /**
   *
   * @param {String} avatar
   * @param {String} style
   * @returns {Welcomer}
   */

  setAvatar(avatar, style) {
    if (!avatar || typeof avatar !== 'string') {
      throw new Error('Expected avatar string instead got ' + typeof avatar);
    }

    if (!style) style = 'normal';

    if (style !== 'normal' && style !== 'round' && style !== 'rounded') {
      throw new Error('Expected avatar style to be normal, round or half-rounded');
    }
    this.style = style;
    this.avatar = avatar;
    return this;
  }

  /**
   *
   * @param {String} position 
   * @returns {Welcomer}
   */

  setPosition(position) {
    if (!position) position = 'left';

    if (position !== 'left' && position !== 'right' && position !== 'center') {
      throw new Error('Expected position to be left, right or center instead got ' + position + '.');
    }

    this.position = position;
    return this;
  }

  /**
   *
   * @param {String} color
   * @returns {Welcomer}
   */

  setColor(color) {
    if (!color || typeof color !== 'string') {
      throw new Error('Expected color string instead got ' + typeof color);
    }
    this.color = color;
    return this;
  }


  /**
   * This function builds the canvas
   * @returns {Promise<Buffer>}
   */

  async build() {
    let { background, name, color, avatar, title, position, style } = this;

    if (!background) throw new Error('No background provided in options.');
    if (!avatar) throw new Error('No avatar provided in options.');
    if (!name) throw new Error('No name provided in options.');

    if (!title) {
      title = 'Welcome!';
    }

    background = background[Math.floor(Math.random() * background.length)];

    if (!color) {
      const fetchColor = await getColor(background);

      if (!color) {
        color = '#FFFFFF';
      }
      if (isLight(fetchColor)) {
        color = '#111111';
      }
    }

    const canvas = canva.createCanvas(800, 270);
    const ctx = canvas.getContext('2d');

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
      roundImg(20, 20, canvas.width, canvas.height, r);
      roundImg(-20, -20, canvas.width, canvas.height, r);
      roundImg(-30, 30, canvas.width, canvas.height, r);
      ctx.clip();
      roundImg(-30, -30, canvas.width, canvas.height, r);
      ctx.clip();
      roundImg(-30, -30, canvas.width, canvas.height, r);
      ctx.clip();
      roundImg(-30, -30, canvas.width, canvas.height, r);
      roundImg(30, -30, canvas.width, canvas.height, r);
      ctx.clip();
      roundImg(30, -30, canvas.width, canvas.height, r);
      roundImg(30, 30, canvas.width, canvas.height, r);
      ctx.clip();
    }

    const fixedbkg = await canva.loadImage(background);
    roundBackground(20);

    ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const blurImage = await canva.loadImage(
      'https://cdn.discordapp.com/attachments/796548640755023883/801045183974211614/Empty.png'
    );

    ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);

    ctx.font = `bold 50px Life`;
    ctx.fillStyle = `${color}`;
    ctx.shadowBlur = 15;
    ctx.textAlign = 'start';

    const username =
      name.length > 15 ? name.substring(0, 15).trim() + '...' : name;
    const textWidth = ctx.measureText(username).width;
    const textWidth1 = ctx.measureText(title).width;
    const renderavatar = await canva.loadImage(avatar);
    

     const applyStyle = (context) => {
      console.log(style)
      switch (style) {
        case 'normal':
          console.log("deine mom is normal")
          break;
        case 'round':
          console.log("deine mom is round")
	// ...
	context.strokeRect(0, 0, canvas.width, canvas.height);

	// Pick up the pen
	context.beginPath();

	// Start the arc to form a circle
	context.arc(125, 125, 100, 0, Math.PI * 2, true);

  context.closePath()

          break;
        case 'rounded':
          console.log("deine mom is rounded")
	// ...
	context.strokeRect(0, 0, canvas.width, canvas.height);

	// Pick up the pen
	context.beginPath();

	// Start the arc to form a circle
	context.arc(125, 125, 100, 0, Math.PI * 2, true);

  context.closePath()

          break;
      }
  
     }  

    switch (position) {
      case "left":
        const xl = canvas.width / 2 - textWidth / 2 + 65;
        const yl = 190;

        ctx.fillText(`${username}`, xl, yl);

        ctx.font = `bold 50px Life`;
        ctx.fillStyle = `${color}`;
        ctx.shadowBlur = 15;

        const xl1 = canvas.width / 2 - textWidth1 / 2 + 65;
        const yl1 = 135;

        ctx.fillText(title, xl1, yl1);

        applyStyle(ctx)

        ctx.drawImage(renderavatar, 50, 50, 170, 170);
        break;

      case "right":
        const xr = canvas.width / 2 - textWidth / 2 - 65;
        const yr = 190;

        ctx.fillText(`${username}`, xr, yr);

        ctx.font = `bold 25px Life`;
        ctx.fillStyle = `${color}`;
        ctx.shadowBlur = 15;

        const xr1 = canvas.width / 2 - textWidth1 / 2 - 65;
        const yr1 = 110;

        ctx.fillText(title, xr1, yr1);

        applyStyle(ctx)

        ctx.drawImage(renderavatar, 580, 50, 170, 170);
        break;

      case "center":
        const xc = canvas.width / 2 - textWidth / 2;
        const yc = 225;


        ctx.fillText(`${username}`, xc, yc);

        ctx.font = `bold 30px Life`;
        ctx.fillStyle = `${color}`;
        ctx.shadowBlur = 15;
        ctx.textAlign = 'center';

        const xc1 = canvas.width / 2;
        const yc1 = 175;

        ctx.fillText(title, xc1, yc1);

        applyStyle(ctx)

          ctx.drawImage(renderavatar, 350, 45, 100, 100);
        break;

    }


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
      roundPfp(20, 20, canvas.width, canvas.height, r);
      roundPfp(-20, -20, canvas.width, canvas.height, r);
      roundPfp(-30, 30, canvas.width, canvas.height, r);
      ctx.clip();
      roundPfp(-30, -30, canvas.width, canvas.height, r);
      ctx.clip();
      roundPfp(-30, -30, canvas.width, canvas.height, r);
      ctx.clip();
      roundPfp(-30, -30, canvas.width, canvas.height, r);
      roundPfp(30, -30, canvas.width, canvas.height, r);
      ctx.clip();
      roundPfp(30, -30, canvas.width, canvas.height, r);
      roundPfp(30, 30, canvas.width, canvas.height, r);
      ctx.clip();
    }

    // returns the buffer Hehe
    return canvas.encode('png');
  }
}

module.exports = Welcomer;
