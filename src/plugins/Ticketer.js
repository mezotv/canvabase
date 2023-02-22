const canvas = require('@napi-rs/canvas');
const { join } = require('path');

/**
 * @example 
 * const ticketer = new canvabase.Ticketer()

    botlist.build().then((img) => {
      canvabase.write("./test/botlist.png", img);
  });
 */

class Ticketer {
    constructor() { }

    /**
     *
     * @param {Array} text
     * @returns {Ticketer}
     */

    setTexts(text) {
        if (!Array.isArray(text)) {
            throw new TypeError(
                'Expected text array instead got ' + typeof text
            );
        }
        this.text = text;
        return this;
    }

    /**
     *
     * @param {Array} icon
     * @returns {Ticketer}
     */

    setIcons(icon) {
        if (!Array.isArray(icon)) {
            throw new TypeError(
                'Expected icon array instead got ' + typeof icon
            );
        }
        this.icon = icon;
        return this;
    }

    /**
     *
     * @param {String} color
     * @returns {Ticketer}
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
        const { text, icon, color } = this;

        canvas.GlobalFonts.registerFromPath(
            join(
                __dirname,
                '..',
                '/',
                'assets',
                '/',
                'fonts',
                'AvenirNextLTPro-Bold.otf'
            ),
            'FontBold'
        );
        canvas.GlobalFonts.registerFromPath(
            join(
                __dirname,
                '..',
                '/',
                'assets',
                '/',
                'fonts',
                'AvenirNextLTPro-Regular.otf'
            ),
            'FontRegular'
        );
        const canvasObject = canvas.createCanvas(400, 200);
        const ctx = canvasObject.getContext('2d');

        ctx.fillStyle = color || "#5865F2";
        ctx.fillRect(0, 0, canvasObject.width, canvasObject.height)

        
        ctx.fillStyle = '#2F2F2F';
        ctx.fillRect(10, 10, 380, 180)

        const botIcon = await canvas.loadImage(
            "https://cdn.discordapp.com/attachments/1047187283234795580/1077988259373781092/svgexport-1-_6_.png"
        );

        ctx.drawImage(botIcon, 15, 15, 20, 20);

        ctx.font = '15px FontSemiBold';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left'; // center the text horizontally
        ctx.textBaseline = 'top'; // align the text to the top of the canvas
        ctx.fillText("ticketerbot.com", 40, 17);

        switch(icon.length) {
            case 1:
                const icon1 = await canvas.loadImage(icon[0]);
                ctx.drawImage(icon1, 15, 45, 20, 20);
                break;
            case 2:
                const icon1 = await canvas.loadImage(icon[0]);
                ctx.drawImage(icon1, 15, 45, 20, 20);
                const icon2 = await canvas.loadImage(icon[1]);
                ctx.drawImage(icon2, 15, 75, 20, 20);
                break;
            case 3: {
                const icon1 = await canvas.loadImage(icon[0]);
                ctx.drawImage(icon1, 15, 45, 20, 20);
                const icon2 = await canvas.loadImage(icon[1]);
                ctx.drawImage(icon2, 15, 75, 20, 20);
                const icon3 = await canvas.loadImage(icon[2]);
                ctx.drawImage(icon3, 15, 105, 20, 20);
                break;
            }

            case 4: {
                const icon1 = await canvas.loadImage(icon[0]);
                ctx.drawImage(icon1, 15, 45, 20, 20);
                const icon2 = await canvas.loadImage(icon[1]);
                ctx.drawImage(icon2, 15, 75, 20, 20);
                const icon3 = await canvas.loadImage(icon[2]);
                ctx.drawImage(icon3, 15, 105, 20, 20);
                const icon4 = await canvas.loadImage(icon[3]);
            }
                





        // returns the buffer
        return canvasObject.encode('png');
    }
}

module.exports = Ticketer;
