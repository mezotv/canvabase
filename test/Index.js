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
//.addBackgrounds(["https://wallpapercave.com/wp/wp5128415.jpg", "https://wallpapercave.com/wp/wp11735586.jpg"])
.addBackground("https://wallpapercave.com/wp/wp5128415.jpg")
.setAvatar("https://cdn.discordapp.com/avatars/1129276241397174322/eb285a4fc0ec3d78dea3cbbb6012e714.webp?size=80", "rounded")
.setPosition("left")
.setColor("#ffff")

welcomer.build().then((img) => {
  canvabase.write("./test/welcomercard.png", img);
})