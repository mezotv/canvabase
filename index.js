const Canva = require("./src/Canva");

module.exports = {
    Canvas: Canva,
    Canva,
    Spotify: require('./src/plugins/Spotify'),
    Welcomer: require('./src/plugins/Welcomer'),
    write: Canva.write,
    author: require("./package.json").author,
    version: require("./package.json").version
};