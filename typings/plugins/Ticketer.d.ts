export = Ticketer;
/**
 * @example
 * const ticketer = new canvabase.Ticketer()

    botlist.build().then((img) => {
      canvabase.write("./test/botlist.png", img);
  });
 */
declare class Ticketer {
    /**
     *
     * @param {Array} text
     * @returns {Ticketer}
     */
    setTexts(text: any[]): Ticketer;
    text: any[];
    /**
     *
     * @param {Array} icon
     * @returns {Ticketer}
     */
    setIcons(icon: any[]): Ticketer;
    icon: any[];
    /**
     * This function builds the canvas
     * @returns {Promise<Buffer>}
     */
    build(): Promise<Buffer>;
}
//# sourceMappingURL=Ticketer.d.ts.map