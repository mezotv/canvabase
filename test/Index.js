const canvabase = require("../index");

const spotify = new canvabase.Spotify()
  .setSong("Kill Bill")
  .setArtist("SZA")
  .setAlbum("SOS")
  .setDuration(153946)
  .setCover("https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1");

//spotify.build().then((img) => {
//  canvabase.write("./test/spotifycard.png", img);
//});

const leaderboard = new canvabase.Leaderboard()
  .setOpacity(0.7)
  .setScoreMessage("Score:")
  .addBachground(
    "image",
    "https://i.imgur.com/h3b4KZI_d.webp?maxwidth=760&fidelity=grand"
  ) 
  .setColors({
    box: "#212121",
    username: "#ffffff",
    score: "#ffffff",
    firstRank: "#FFD700",
    secondRank: "#C0C0C0",
    thirdRank: "#CD7F32",
  }) 
  .addUserData([
    {
      top: 1,
      avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      tag: "Dominik",
      score: 5555,
    },
    {
      top: 2,
      avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
      tag: "That Man",
      score: 1337,
    },
    {
      top: 3,
      avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
      tag: "Sky",
      score: 1054,
    },
    {
      top: 4,
      avatar: "https://cdn.discordapp.com/embed/avatars/4.png",
      tag: "FortniteFriend",
      score: 903,
    },
    {
      top: 5,
      avatar: "https://cdn.discordapp.com/embed/avatars/5.png",
      tag: "Forgetfulskybro",
      score: 0,
    },
  ]);

leaderboard.build().then((img) => {
  canvabase.write("./test/leaderboard.png", img);
});
