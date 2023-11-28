export = Leaderboard;
/**
 * @example
 * const leaderboard = new canvabase.Leaderboard()
  .setOpacity(0.7)
  .setScoreMessage("Score:"
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
      tag: "DominikDominikDominikDomi3nikDominikDominik",
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
      avatar: "https://cdn.discordapp.com/embed/avatars/3.png",
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
})


  });
 */
declare class Leaderboard {
    /**
     * .addUserData
     * @param {Array||object} usersData [{ top: int, avatar: "string", tag: "string", score: int}]
     * @returns {Leaderboard}
     * @example addUserData([{ top: 1, avatar: "https://image.com/image.png", tag: "dominikdev", score: 5 }])
     */
    addUserData(usersData: any): Leaderboard;
    usersData: any;
    /**
     * .setScoreMessage
     * @param {string} message Set Custom Score Message
     * @returns {Leaderboard}
     * @example setScoreMessage("Message")
     */
    setScoreMessage(message: string): Leaderboard;
    scoreMessage: string;
    /**
     * .setColors
     * @param {object} colors {box: "hexcolor", username: "hexcolor", score: "hexcolor", firstRank: "hexcolor", secondRank: "hexcolor", thirdRank: "hexcolor"}
     * @returns {Leaderboard}
     * @example setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#FFD700', secondRank: '#C0C0C0', thirdRank: '#CD7F32' })
     */
    setColors(colors: object): Leaderboard;
    colors: any;
    /**
     * Sets the opacity of the element.
     *
     * @param {number} opacity The opacity value, must be between 0 and 1.
     * @returns {Leaderboard} The calling object for chaining.
     * @example setOpacity(0.6)
     */
    setOpacity(opacity?: number): Leaderboard;
    opacity: number;
    /**
     * Sets the background of the element.
     *
     * @param {string} type The type of background: "image" or "color".
     * @param {string} value The value of the background: an URL for an image or a hex color code.
     * @returns {Leaderboard} The calling object for chaining.
     * @example addBachground("image","https://image.com/image.png")
     * @example addBachground("color","#ff2f")
     */
    addBachground(type: string, value: string): Leaderboard;
    background: {};
    build(): Promise<Buffer>;
}
//# sourceMappingURL=Leaderboard.d.ts.map