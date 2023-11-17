const canvas = require("@napi-rs/canvas");
const { join } = require("path");

/**
 * @example 
 * const leaderboard = new canvabase.Leaderboard()
  .setOpacity(0.7)
  .setScoreMessage("Score:"
  .addBachground(
    "image",
    "https://i.imgur.com/h3b4KZI_d.webp?maxwidth=760&fidelity=grand"
  )
  .setColors({
    box: "#212121",
    username: "#ffffff",
    score: "#ffffff",
    firstRank: "#FFD700",
    secondRank: "#C0C0C0",
    thirdRank: "#CD7F32",
  }) 
  .addUserData([
    {
      top: 1,
      avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      tag: "DominikDominikDominikDomi3nikDominikDominik",
      score: 5555,
    },
    {
      top: 2,
      avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
      tag: "That Man",
      score: 1337,
    },
    {
      top: 3,
      avatar: "https://cdn.discordapp.com/embed/avatars/3.png",
      tag: "Sky",
      score: 1054,
    },
    {
      top: 4,
      avatar: "https://cdn.discordapp.com/embed/avatars/4.png",
      tag: "FortniteFriend",
      score: 903,
    },
    {
      top: 5,
      avatar: "https://cdn.discordapp.com/embed/avatars/5.png",
      tag: "Forgetfulskybro",
      score: 0,
    },
  ]);

leaderboard.build().then((img) => {
  canvabase.write("./test/leaderboard.png", img);
});
})


  });
 */

class Leaderboard {
  constructor() {}

  /**
   * .addUserData
   * @param {Array||object} usersData [{ top: int, avatar: "string", tag: "string", score: int}]
   * @returns {Leaderboard}
   * @example addUserData([{ top: 1, avatar: "https://image.com/image.png", tag: "dominikdev", score: 5 }])
   */
  addUserData(usersData) {
    if (usersData.length > 10) {
      throw new Error("addUserData values cannot be greater than 10.");
    }
    this.usersData = usersData;
    return this;
  }

  /**
   * .setScoreMessage
   * @param {string} message Set Custom Score Message
   * @returns {Leaderboard}
   * @example setScoreMessage("Message")
   */
  setScoreMessage(message) {
    this.scoreMessage = message;
    return this;
  }

  /**
   * .setColors
   * @param {object} colors {box: "hexcolor", username: "hexcolor", score: "hexcolor", firstRank: "hexcolor", secondRank: "hexcolor", thirdRank: "hexcolor"}
   * @returns {Leaderboard}
   * @example setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#FFD700', secondRank: '#C0C0C0', thirdRank: '#CD7F32' })
   */
  setColors(colors) {
    this.colors = colors;
    return this;
  }

  /**
   * Sets the opacity of the element.
   *
   * @param {number} opacity The opacity value, must be between 0 and 1.
   * @returns {Leaderboard} The calling object for chaining.
   * @example setOpacity(0.6)
   */
  setOpacity(opacity = 0) {
    if (opacity < 0 || opacity > 1) {
      throw new Error(
        "The value of the opacity of setOpacity method must be between 0 and 1 (0 and 1 included)."
      );
    }

    this.opacity = opacity;
    return this;
  }

  /**
   * Sets the background of the element.
   *
   * @param {string} type The type of background: "image" or "color".
   * @param {string} value The value of the background: an URL for an image or a hex color code.
   * @returns {Leaderboard} The calling object for chaining.
   * @example addBachground("image","https://image.com/image.png")
   * @example addBachground("color","#ff2f")
   */
  addBachground(type, value) {
    if (!type || !value) {
      throw new Error("Both arguments for addBachground are required.");
    }

    if (type !== "color" && type !== "image") {
      throw new Error(
        "The first argument for addBachground must be 'color' or 'image'."
      );
    }

    if (type === "color") {
      if (!/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(value)) {
        throw new Error(
          "Invalid color for the second argument in addBachground method. You must give a hexadecimal color."
        );
      }
    }
    this.background = {};
    this.background.type = type;
    this.background.background = value;

    return this;
  }

  async build() {
    let { background, usersData, colors, scoreMessage, opacity } = this;

    canvas.GlobalFonts.registerFromPath(
      join(__dirname, "..", "assets", "fonts", "Poppins.ttf"),
      "Poppins"
    );

    const fillRoundRect = (ctx, x, y, w, h, r, f, s) => {
      if (typeof r === "number")
        r = {
          tl: r,
          tr: r,
          br: r,
          bl: r,
        };
      else {
        let defaultRadius = {
          tl: 0,
          tr: 0,
          br: 0,
          bl: 0,
        };
        for (let side in defaultRadius) {
          r[side] = r[side] || defaultRadius[side];
        }
      }
      ctx.beginPath();
      ctx.moveTo(x + r.tl, y);
      ctx.lineTo(x + w - r.tr, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
      ctx.lineTo(x + w, y + h - r.br);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
      ctx.lineTo(x + r.bl, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
      ctx.lineTo(x, y + r.tl);
      ctx.quadraticCurveTo(x, y, x + r.tl, y);
      ctx.closePath();
      if (f) ctx.fill();
      if (s) ctx.stroke();
    };

    let userLenght = usersData.length * 74.5;

    const canvasObject = canvas.createCanvas(680, userLenght);
    const ctx = canvasObject.getContext("2d");

    ctx.globalAlpha = 1;

    if (background.type === "color") {
      ctx.beginPath();
      ctx.fillStyle = background.background;
      ctx.fillRect(0, 0, canvasObject.width, canvasObject.height);
    } else if (background.type === "image") {
      try {
        ctx.drawImage(
          await canvas.loadImage(background.background),
          0,
          0,
          canvasObject.width,
          canvasObject.height
        );
      } catch {
        throw new Error(
          "The image url provided in addBachground method is invalid."
        );
      }
    }

    if (usersData) {
      let boxY = 0,
        avatarY = 0,
        tagY = 45,
        xpY = 45,
        levelY = 30,
        rankY = 45;
      for (let i = 0; i < usersData.length; i++) {
        ctx.save();
        ctx.fillStyle = colors.box;
        ctx.globalAlpha = opacity;
        fillRoundRect(ctx, 0, boxY, canvasObject.width, 70, 15, true, false);
        ctx.globalAlpha = 1;

        const avatar = await canvas.loadImage(usersData[i].avatar);
        ctx.clip();
        ctx.drawImage(avatar, 0, avatarY, 70, 70);
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 6;
        ctx.shadowColor = "#0a0a0a";

        ctx.fillStyle = colors.username;
        ctx.font = "bold 25px Poppins";
        ctx.textAlign = "left";
        ctx.fillText(usersData[i].tag.slice(0, 21), 80, tagY, 260);

        ctx.fillStyle = colors.score;
        ctx.font = "bold 20px Poppins";
        ctx.textAlign = "left";
        ctx.fillText(`${usersData[i].score}`, 540, xpY, 200);
        ctx.textAlign = "right";
        ctx.fillText(`${scoreMessage}`, 535, xpY, 200);

        if (usersData[i].top === 1) {
          ctx.fillStyle = colors.firstRank;
        } else if (usersData[i].top === 2) {
          ctx.fillStyle = colors.secondRank;
        } else if (usersData[i].top === 3) {
          ctx.fillStyle = colors.thirdRank;
        }

        ctx.font = "bold 30px Poppins";
        ctx.textAlign = "right";
        ctx.fillText("#" + usersData[i].top, 660, rankY, 75);

        boxY = boxY + 75;
        avatarY = avatarY + 75;
        tagY = tagY + 75;
        xpY = xpY + 75;
        levelY = levelY + 75;
        rankY = rankY + 75;
        ctx.restore();
      }
    } else {
      ctx.font = "bold 40px Poppins";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 8;
      ctx.shadowOffsetY = 6;
      ctx.shadowColor = "#0a0a0a";
      ctx.fillText("Not found!", 340, 370, 500);
    }

    // returns the buffer Ara Ara
    return canvasObject.encode("png");
  }
}

module.exports = Leaderboard;
