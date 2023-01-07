const Canvas = require("./src/Canvacord");

module.exports = {
    Canvas: Canvas,
    Canva,
    Spotify: require('./src/plugins/Spotify'),
    author: require("./package.json").author,
    version: require("./package.json").version
};