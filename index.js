const Canva = require("./src/Canva");

module.exports = {
    Canvas: Canva,
    Canva,
    Spotify: require('./src/plugins/Spotify'),
    write: Canva.write,
    author: require("./package.json").author,
    version: require("./package.json").version
};