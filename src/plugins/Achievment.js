const { isLight } = require("../functions/isLight");
const { getSpotifyColor } = require("../functions/fetchSpotifyColor");
const canvas = require("@napi-rs/canvas");
const { join } = require('path');


/**
 * @example 
 * const spotify = new canvabase.Spotify()
      .setSong("Kill Bill")
      .setArtist("SZA")
      .setAlbum("SOS")
      .setDuration(153946)
      .setCover(
        "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1"
      );

    spotify.build().then((img) => {
      canvabase.write("./test/spotifycard.png", img);
  });
 */

class Achievment {
  constructor() {
  }

  /**
   * 
   * @param {String} song 
   * @returns {Spotify}
   */

  setSong(song) {
    if (!song || typeof song !== "string") {
      throw new Error("Expected song string instead got " + typeof song);
    }
    this.song = song
    return this;
  }

  /**
   * 
   * @param {String} artist 
   * @returns {Spotify}
   */

  setArtist(artist) {
    if (!artist || typeof artist !== "string") {
      throw new Error("Expected artist string instead got " + typeof artist);
    }
    this.artist = artist
    return this;
  }

    /**
   * 
   * @param {String} albumn 
   * @returns {Spotify}
   */

  setAlbum(album) {
    if (!album || typeof album !== "string") {
      throw new Error("Expected album string instead got " + typeof album);
    }
    this.album = album
    return this;
  }

    /**
   * 
   * @param {Number} duration 
   * @returns {Spotify}
   */

  setDuration(duration) {
    if (!duration || typeof duration !== "number") {
      throw new Error("Expected duration number instead got " + typeof duration);
    }
    this.duration = duration
    return this;
  }

    /**
   * 
   * @param {String} albumArt 
   * @returns {Spotify}
   */

  setCover(albumArt) {
    if (!albumArt || typeof albumArt !== "string") {
      throw new Error("Expected albumArt string instead got " + typeof albumArt);
    }
    this.albumArt = albumArt
    return this;
  }


    /**
     * This function builds the canvas
     * @returns {Promise<Buffer>}
     */

    async build() {

    const { song, artist, album, duration, albumArt } = this;

    if(!song) throw new Error("No song provided in options.")
    if(!artist) throw new Error("No artist provided in options.")
    if(!album) throw new Error("No album provided in options.")
    if(!duration) throw new Error("No duration provided in options.")
    if(!albumArt) throw new Error("No cover provided in options.")

    const color = await getSpotifyColor(albumArt)

    if(isLight(color[0])) { color[0] = "#0F0F0F" }
    if(isLight(color[1])) { color[1] = "#0F0F0F" }

    canvas.GlobalFonts.registerFromPath(join(__dirname, '..', '/', 'fonts', 'AvenirNextLTPro-Bold.otf'), 'FontBold')
    canvas.GlobalFonts.registerFromPath(join(__dirname, '..', '/', 'fonts', 'AvenirNextLTPro-Regular.otf'), 'FontRegular')
    const canvasObject = canvas.createCanvas(428, 926);
    const ctx = canvasObject.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 428, 926);

    gradient.addColorStop(0, color[0]);
    gradient.addColorStop(1, color[1]);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 428, 926);

    // draw the album art image onto the canvas

    const logo = await canvas.loadImage(albumArt);
    ctx.drawImage(logo, 26, 160, 380, 380);

    ctx.font = '14px FontBold'
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"; // center the text horizontally
    ctx.textBaseline = "top"; // align the text to the top of the canvas
    ctx.fillText(album, 214, 55)

    let cutstring;
    if (song.length > 33) { cutstring = song.substring(0, 33) + '...' } else { cutstring = song }
    ctx.font = '22px FontBold'
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "left"; // center the text horizontally
    ctx.textBaseline = "top"; // align the text to the top of the canvas
    ctx.fillText(cutstring, 26, 607)

    ctx.font = '16px FontBold'
    ctx.fillStyle = "#B3B3B3"
    ctx.textAlign = "left"; // center the text horizontally
    ctx.textBaseline = "top"; // align the text to the top of the canvas
    ctx.fillText(artist, 26, 641)

    let time = Math.round(duration / 60)
    time = time.toLocaleString().replace(",", ":")
    time = time.substring(0, time.length - 1)

    ctx.font = '10px FontBold'
    ctx.fillStyle = "#B3B3B3"
    ctx.textAlign = "left"; // center the text horizontally
    ctx.textBaseline = "top"; // align the text to the top of the canvas
    ctx.fillText(time, 382, 694)

    ctx.font = '10px FontBold'
    ctx.fillStyle = "#B3B3B3"
    ctx.textAlign = "left"; // center the text horizontally
    ctx.textBaseline = "top"; // align the text to the top of the canvas
    ctx.fillText("0:00", 20, 694)

    const image = await canvas.loadImage("https://cdn.discordapp.com/attachments/1047187283234795580/1053677610367975624/Track_View.png");
    ctx.drawImage(image, 0, 0, 428, 926);

    // returns the buffer Ara Ara
    return canvasObject.encode("png");
  }
}

module.exports = Spotify;
