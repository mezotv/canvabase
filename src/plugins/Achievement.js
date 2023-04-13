const { isLight } = require('../functions/isLight');
const { getSpotifyColor } = require('../functions/getPixelColor');
const canvas = require('@napi-rs/canvas');
const { join } = require('path');

/**
 * @example 
 * const achievement = new canvabase.Achievement()
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

class Achievement {
  constructor() {}

  /**
   *
   * @param {String} song
   * @returns {Achievement}
   */

  setSong(song) {
    if (!song || typeof song !== 'string') {
      throw new Error('Expected song string instead got ' + typeof song);
    }
    this.song = song;
    return this;
  }



  /**
   * This function builds the canvas
   * @returns {Promise<Buffer>}
   */

  async build() {
    const {  } = this;


    // returns the buffer
    return canvasObject.encode('png');
  }
}

module.exports = Achievement;
