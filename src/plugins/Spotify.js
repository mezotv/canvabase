const { isLight } = require("../functions/isLight");
const { getSpotifyColor } = require("../functions/fetchSpotifyColor");
const canvas = require("@napi-rs/canvas");
const { join } = require('path')

class Spotify {
  constructor(song, artist, album, duration, albumArt) {
    this.song = song;
    this.artist = artist;
    this.album = album;
    this.duration = duration;
    this.albumArt = albumArt;

    if (typeof this.song === "undefined" || this.song === null) {
      throw new Error("Spotify Song can not be an undefined or null!");
    }

    if (typeof this.song !== "string") {
      throw new TypeError("Spotify Song needs to be a string!");
    }

    if (typeof this.artist === "undefined" || this.artist === null) {
      throw new Error("Spotify Artist can not be an undefined or null!");
    }

    if (typeof this.artist !== "string") {
      throw new TypeError("Spotify Artist needs to be a string!");
    }

    if (typeof this.album === "undefined" || this.album === null) {
      throw new Error("Spotify Album can not be an undefined or null!");
    }

    if (typeof this.album !== "string") {
      throw new TypeError("Spotify Album needs to be a string!");
    }

    if (typeof this.duration === "undefined" || this.duration === null) {
      throw new Error("Spotify Song can not be an undefined or null!");
    }

    if (typeof this.duration !== "number") {
      throw new TypeError("Spotify Song needs to be a number!");
    }

    if (typeof this.albumArt === "undefined" || this.albumArt === null) {
      throw new Error("Spotify Album Art can not be an undefined or null!");
    }

    if (typeof this.albumArt !== "string") {
      throw new TypeError("Spotify Album Art needs to be a string!");
    }

    // add a tiny async function

    this.generate = async () => {

    console.log(albumArt)

    const color = await getSpotifyColor(albumArt)

    if(isLight(color[0])) { color[0] = "#0F0F0F" }
    if(isLight(color[1])) { color[1] = "#0F0F0F" }

    console.log(color)
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

    const logo = canvas.loadImage(albumArt);
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

    const image = canvas.loadImage("https://cdn.discordapp.com/attachments/1047187283234795580/1053677610367975624/Track_View.png");
    ctx.drawImage(image, 0, 0, 428, 926);
    }
    this.generate()
  }
}




const spotify = new Spotify("albumart", "song", "song", 12999, "https://cdn.discordapp.com/attachments/1007751044463345784/1053673397319630878/spotify-card.png");

    module.exports = Spotify;

console.log(spotify);
