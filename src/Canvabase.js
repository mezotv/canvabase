const fs = require("fs");

class Canvabase {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

     static write(data, name) {
        return fs.writeFileSync(data, name);
    } 

}

module.exports = Canvabase;
