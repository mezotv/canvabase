class Spotify {
    constructor(song, artist, album, duration, albumArt) {
        this.song = song;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.albumArt = albumArt;

        if(typeof this.song === "undefined" || typeof this.song === "null") {
            throw new Error("Spotify Song can not be an undefined or null!");
        }

        if(typeof this.song !== "string") {
            throw new TypeError("Spotify Song needs to be a string!");
        }

        if(typeof this.artist === "undefined" || typeof this.artist === "null") {
            throw new Error("Spotify Artist can not be an undefined or null!");
        }

        if(typeof this.artist !== "string") {
            throw new TypeError("Spotify Artist needs to be a string!");
        }

        if(typeof this.album === "undefined" || typeof this.album === "null") {
            throw new Error("Spotify Album can not be an undefined or null!");
        }

        if(typeof this.album !== "string") {
            throw new TypeError("Spotify Album needs to be a string!");
        }

        if(typeof this.duration === "undefined" || typeof this.duration === "null") {
            throw new Error("Spotify Song can not be an undefined or null!");
        }

        if(typeof this.duration !== "number") {
            throw new TypeError("Spotify Song needs to be a number!");
        }

        if(typeof this.albumArt === "undefined" || typeof this.albumArt === "null") {
            throw new Error("Spotify Album Art can not be an undefined or null!");
        }

        if(typeof this.albumArt !== "string") {
            throw new TypeError("Spotify Album Art needs to be a string!");
        }
    }
}

module.exports = Spotify;


const spotify = new Spotify("albumart", "song", "song", 12, "song");

console.log(spotify)