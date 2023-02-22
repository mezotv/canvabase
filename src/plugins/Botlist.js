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
        if (!style) {
            style = 'medium';
        }
        if (typeof style !== 'string') {
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
     * @param {String} avatar
     * @returns {Botlist}
     */

    setAvatar(avatar) {
        if (!avatar || typeof avatar !== 'string') {
            throw new Error('Expected avatar string instead got ' + typeof avatar);
        }

        if (!avatar) {
            avatar = 'https://cdn.discordapp.com/avatars/529815278456930314/76b717e78fe80bfb2dbb73b60e96fd14.webp?size=60';
        }
        this.avatar = avatar;
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
     * @param {String} prefix
     * @returns {Botlist}
     */

    setPrefix(prefix) {
        if (!prefix || typeof prefix !== 'string') {
            throw new Error('Expected prefix string instead got ' + typeof prefix);
        }
        this.prefix = prefix;
        return this;
    }

    /**
    *
    * @param {String} botlist
    * @returns {Botlist}
    */

    setBotlist(botlist) {
        if (!botlist || typeof botlist !== 'string') {
            throw new Error('Expected botlist string instead got ' + typeof botlist);
        }
        this.botlist = botlist;
        return this;
    }


    /**
     * This function builds the canvas
     * @returns {Promise<Buffer>}
     */

    async build() {
        const { username, description, status, library, guilds, votes, botlist, style, prefix, avatar } = this;


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

        switch (style) {
            case 'medium':
                break;
            case 'small':
                const canvasObject = canvas.createCanvas(400, 140);
                const ctx = canvasObject.getContext('2d');

                const layout = await canvas.loadImage(
                    'https://cdn.discordapp.com/attachments/1047187283234795580/1077670862754418849/small-widget.png'
                );

                ctx.drawImage(layout, 0, 0, canvas.width, canvas.height);

                ctx.font = '25px FontBold';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'left'; // center the text horizontally
                ctx.textBaseline = 'top'; // align the text to the top of the canvas
                ctx.fillText(username, 45, 10);


                ctx.font = '20px FontBold';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'left'; // center the text horizontally
                ctx.textBaseline = 'top'; // align the text to the top of the canvas
                ctx.fillText(guilds.toLocaleString(), 38, 55);

                ctx.font = '20px FontBold';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'left'; // center the text horizontally
                ctx.textBaseline = 'top'; // align the text to the top of the canvas
                ctx.fillText(votes.toLocaleString(), 233, 54);

                ctx.font = '20px FontBold';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'left'; // center the text horizontally
                ctx.textBaseline = 'top'; // align the text to the top of the canvas
                ctx.fillText(library, 38, 85);

                ctx.font = '20px FontBold';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'left'; // center the text horizontally
                ctx.textBaseline = 'top'; // align the text to the top of the canvas
                ctx.fillText(prefix, 233, 85);

                ctx.font = '15px FontBold';
                ctx.fillStyle = '#fff8';
                ctx.textAlign = 'center'; // center the text horizontally
                ctx.textBaseline = 'top'; // align the text to the top of the canvas
                ctx.fillText(botlist, 200, 121);

                const avatarIcon = await canvas.loadImage(
                    avatar
                );

                ctx.beginPath();
                ctx.arc(10 + 27 / 2, 6 + 27 / 2, 27 / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(avatarIcon, 10, 6, 27, 27);

                // returns the buffer
                return canvasObject.encode('png');
                break;
            case 'big':
                break;
        }
    }
}

module.exports = Botlist;
