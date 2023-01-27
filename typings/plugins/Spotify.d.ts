export = Spotify;
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
declare class Spotify {
    /**
     *
     * @param {String} song
     * @returns {Spotify}
     */
    setSong(song: string): Spotify;
    song: string;
    /**
     *
     * @param {String} artist
     * @returns {Spotify}
     */
    setArtist(artist: string): Spotify;
    artist: string;
    /**
   *
   * @param {String} albumn
   * @returns {Spotify}
   */
    setAlbum(album: any): Spotify;
    album: string;
    /**
   *
   * @param {Number} duration
   * @returns {Spotify}
   */
    setDuration(duration: number): Spotify;
    duration: number;
    /**
   *
   * @param {String} albumArt
   * @returns {Spotify}
   */
    setCover(albumArt: string): Spotify;
    albumArt: string;
    /**
     * This function builds the canvas
     * @returns {Promise<Buffer>}
     */
    build(): Promise<Buffer>;
}
//# sourceMappingURL=Spotify.d.ts.map