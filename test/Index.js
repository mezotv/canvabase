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
  .setAvatar("https://cdn.discordapp.com/avatars/347077478726238228/3b77f755fa8e66fd75d1e2d3fb8b1611.png?size=512", "rounded")
  .setPosition("left")
  .setColor("#ffff")

welcomer.build().then((img) => {
  canvabase.write("./test/welcomercard.png", img);
})

const botlist = new canvabase.Botlist()
  .setStyle("small")
  .setUsername("Would You")
  .addDescription("This is a cool bot")
  .setStatus("dnd")
  .setGuilds(2310)
  .setVotes(80)
  .setPrefix("/")
  .setAvatar("https://cdn.discordapp.com/icons/1009562516105461780/a2b2fb036d7a044bea40493685f84462.webp?size=80")
  .setLibrary("discord.js")
  .setBotlist("https://discord.gg/wouldyou")


botlist.build().then((img) => {
  canvabase.write("./test/botlist.png", img);
});

const ticketer = new canvabase.Ticketer()
  .setTexts(["Hello", "How are you?", "I'm fine, thanks!"])
  .setIcons(["https://cdn.discordapp.com/emojis/810000000000000000.png?v=1", "https://cdn.discordapp.com/emojis/810000000000000000.png?v=1", "https://cdn.discordapp.com/emojis/810000000000000000.png?v=1"])
ticketer.build().then((img) => {
  canvabase.write("./test/ticketer.png", img);
});