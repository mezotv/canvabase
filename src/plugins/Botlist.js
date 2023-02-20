const { isLight } = require('../functions/isLight');
const { getSpotifyColor } = require('../functions/fetchSpotifyColor');
const canvas = require('@napi-rs/canvas');
const { join } = require('path');

/**
 * @example 
 * const botlist = new canvabase.Botlist()

    botlist.build().then((img) => {
      canvabase.write("./test/botlist.png", img);
  });
 */

class Botlist {
    constructor() { }

    /**
     *
     * @param {String} style
     * @returns {Botlist}
     */

    setStyle(style) {
        if(!style) {
            style = 'medium';
        }
        if ( typeof style !== 'string') {
            throw new Error('Expected style string instead got ' + typeof style);
        }

        if (style !== 'medium' && style !== 'small' && style !== 'big') {
            throw new TypeError('Expected avatar style to be medium, small or big');
          }
        this.style = style;
        return this;
    }

    /**
     *
     * @param {String} username
     * @returns {Botlist}
     */

    setUsername(username) {
        if (!username || typeof username !== 'string') {
            throw new Error('Expected username string instead got ' + typeof username);
        }
        this.username = username;
        return this;
    }

    /**
     *
     * @param {String} description
     * @returns {Botlist}
     */

    addDescription(description) {
        if (!description || typeof description !== 'string') {
            throw new Error('Expected description string instead got ' + typeof description);
        }
        this.description = description;
        return this;
    }

    /**
     *
     * @param {String} status
     * @returns {Botlist}
     */

    setStatus(status) {
        if (!status || typeof status !== 'string') {
            throw new Error('Expected status string instead got ' + typeof status);
        }
        this.status = status;
        return this;
    }

    /**
     *
     * @param {Number} guilds
     * @returns {Botlist}
     */

    setGuilds(guilds) {
        if (!guilds || typeof guilds !== 'number') {
            throw new Error('Expected guilds number instead got ' + typeof guilds);
        }
        this.guilds = guilds;
        return this;
    }

    /**
     *
     * @param {Number} votes
     * @returns {Botlist}
     */

    setVotes(votes) {
        if (!votes || typeof votes !== 'number') {
            throw new Error('Expected votes number instead got ' + typeof votes);
        }
        this.votes = votes;
        return this;
    }

    /**
     *
     * @param {String} library
     * @returns {Botlist}
     */

    setLibrary(library) {
        if (!library || typeof library !== 'string') {
            throw new Error('Expected library string instead got ' + typeof library);
        }
        this.library = library;
        return this;
    }

    /**
    *
    * @param {String} botlist
    * @param {String} icon
    * @returns {Botlist}
    */

    setBotlist(botlist, icon) {
        if (!botlist || typeof botlist !== 'string') {
            throw new Error('Expected botlist string instead got ' + typeof botlist);
        }
        if (!icon) {
            icon = 'https://cdn.discordapp.com/attachments/827530000000000000/827530002000578590/unknown.png';
        }
        this.botlist = botlist;
        this.icon = icon;
        return this;
    }


    /**
     * This function builds the canvas
     * @returns {Promise<Buffer>}
     */

    async build() {
        const { username, description, status, library, guilds, votes, botlist, icon, style } = this;


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

module.exports = Botlist;
