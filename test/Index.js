const canva = require("../index");

const spotify = new canva.Spotify(
  "Kill Bill",
  "SZA",
  "SOS",
  153946,
  "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1"
);

spotify.build().then((img) => {
    canva.write("./test/spotifycard.png", img);
    console.log(img)
  });