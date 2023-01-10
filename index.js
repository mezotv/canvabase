const Canvabase = require("./src/Canvabase");

module.exports = {
    Canvas: Canvabase,
    Canvabase,
    Spotify: require('./src/plugins/Spotify'),
    write: Canvabase.write,
    author: require("./package.json").author,
    version: require("./package.json").version
};