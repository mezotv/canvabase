export = Welcomer;
/**
 * @example
 * const welcomer = new canvabase.Welcomer()
  .setName("Dominik")
  .setTitle("Welcome!")
  .addBackground(["https://wallpapercave.com/wp/wp5128415.jpg", "https://wallpapercave.com/wp/wp11735586.jpg"])
  .setAvatar("https://cdn.discordapp.com/avatars/347077478726238228/3b77f755fa8e66fd75d1e2d3fb8b1611.png?size=512")

  welcomer.build().then((img) => {
    canvabase.write("./test/welcomercard.png", img);
  })
 */
declare class Welcomer {
    color: string;
    /**
     *
     * @param {Array} background
     * @returns {Welcomer}
     */
    addBackground(background: any[]): Welcomer;
    background: any[];
    /**
     *
     * @param {Array} name
     * @returns {Welcomer}
     */
    setName(name: any[]): Welcomer;
    name: any;
    /**
     *
     * @param {Array} title
     * @returns {Welcomer}
     */
    setTitle(title: any[]): Welcomer;
    title: any;
    /**
     *
     * @param {String} avatar
     * @returns {Welcomer}
     */
    setAvatar(avatar: string): Welcomer;
    avatar: string;
    /**
     *
     * @param {String} color
     * @returns {Welcomer}
     */
    setcolor(color: string): Welcomer;
    /**
     * This function builds the canvas
     * @returns {Promise<Buffer>}
     */
    build(): Promise<Buffer>;
}
//# sourceMappingURL=Welcomer.d.ts.map