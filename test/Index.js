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
  .setName("Dominik")
  .setTitle("Welcome!")
  .addBackground(["https://wallpapercave.com/wp/wp5128415.jpg", "https://wallpapercave.com/wp/wp11735586.jpg"])
  .setAvatar("https://cdn.discordapp.com/avatars/347077478726238228/3b77f755fa8e66fd75d1e2d3fb8b1611.png?size=512")
  .setColor("#f12")

welcomer.build().then((img) => {
  canvabase.write("./test/welcomercard.png", img);
})