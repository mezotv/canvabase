const { isLight } = require("../functions/isLight");
const canvas = require("@napi-rs/canvas");

class Welcomer {
  constructor() {
  }

  addBackground(background) {
    if (!background || typeof background !== "string") {
      throw new Error("Expected background string instead got " + typeof background);
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

    async build() {

    const { background, name} = this;

    if(!background) throw new Error("No background provided in options.")
    if(!name) throw new Error("No name provided in options.")   

    // returns the buffer
    return canvasObject.encode("png");
  }
}

module.exports = Welcomer;
