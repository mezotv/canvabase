const Canvabase = require("./src/Canvabase");

module.exports = {
    Canvas: Canvabase,
    Canvabase,
    AssetLoader: require('./src/AssetLoader'),
    Spotify: require('./src/plugins/Spotify'),
    Welcomer: require('./src/plugins/Welcomer'),
    Botlist: require('./src/plugins/Botlist'),
    write: Canvabase.write,
    author: require("./package.json").author,
    version: require("./package.json").version
};