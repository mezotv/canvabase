const { isLight } = require('../functions/isLight');
const { getSpotifyColor } = require('../functions/fetchSpotifyColor');
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
     * This function builds the canvas
     * @returns {Promise<Buffer>}
     */

    async build() {
        const { text, icon } = this;

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
        const canvasObject = canvas.createCanvas(400, 140);
        const ctx = canvasObject.getContext('2d');

        // returns the buffer
        return canvasObject.encode('png');
    }
}

module.exports = Ticketer;
