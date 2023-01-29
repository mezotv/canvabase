const fs = require("fs");


class Canvabase {

    /**
     * **⚠ You may not instantiate Canvacord class! ⚠**
     * @hideconstructor
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Turns the data into a file
     * @param {Buffer} data data to write
     * @param {string} name file name
     * @returns {void}
     */
     static write(data, name) {
        return fs.writeFileSync(data, name);
    } 

}

module.exports = Canvabase;
