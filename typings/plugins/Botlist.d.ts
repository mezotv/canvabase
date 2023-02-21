export = Botlist;
/**
 * @example
 * const botlist = new canvabase.Botlist()

    botlist.build().then((img) => {
      canvabase.write("./test/botlist.png", img);
  });
 */
declare class Botlist {
    /**
     *
     * @param {String} style
     * @returns {Botlist}
     */
    setStyle(style: string): Botlist;
    style: string;
    /**
     *
     * @param {String} username
     * @returns {Botlist}
     */
    setUsername(username: string): Botlist;
    username: string;
    /**
     *
     * @param {String} avatar
     * @returns {Botlist}
     */
    setAvatar(avatar: string): Botlist;
    avatar: string;
    /**
     *
     * @param {String} description
     * @returns {Botlist}
     */
    addDescription(description: string): Botlist;
    description: string;
    /**
     *
     * @param {String} status
     * @returns {Botlist}
     */
    setStatus(status: string): Botlist;
    status: string;
    /**
     *
     * @param {Number} guilds
     * @returns {Botlist}
     */
    setGuilds(guilds: number): Botlist;
    guilds: number;
    /**
     *
     * @param {Number} votes
     * @returns {Botlist}
     */
    setVotes(votes: number): Botlist;
    votes: number;
    /**
     *
     * @param {String} library
     * @returns {Botlist}
     */
    setLibrary(library: string): Botlist;
    library: string;
    /**
     *
     * @param {String} prefix
     * @returns {Botlist}
     */
    setPrefix(prefix: string): Botlist;
    prefix: string;
    /**
    *
    * @param {String} botlist
    * @returns {Botlist}
    */
    setBotlist(botlist: string): Botlist;
    botlist: string;
    /**
     * This function builds the canvas
     * @returns {Promise<Buffer>}
     */
    build(): Promise<Buffer>;
}
//# sourceMappingURL=Botlist.d.ts.map