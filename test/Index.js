const canvabase = require("../index");

const spotify = new canvabase.Spotify()
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

const welcomer = new canvabase.Welcomer()
  .setName("Napi")
  .addBackground("https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1");

welcomer.build().then((img) => {
  canvabase.write("./test/welcomercard.png", img);
})