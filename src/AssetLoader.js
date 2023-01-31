const fs = require("fs");

class AssetLoader {
  assetDirs = [ "./assets/" ];
  types = [ "image", "font", "text" ]
  classifications = {
    "png": 0,
    "otf": 1,
    "txt": 2
  }
  extensionRegex = /\.(?:.(?!\.))+$/i;
  nameRegex = /^[^.]*/;

  constructor(...sourceDirectories) {
    if (sourceDirectories.length != 0) this.assetDirs = sourceDirectories;
  }
  load() {
    return new Promise(async res => {
      let dirs = [];
      this.assetDirs.forEach(d => {
        console.log(d);
        dirs.push(this.readDir(d));
      });
      var files = await Promise.allSettled(dirs);
      files = files.filter(e => e.status == "fulfilled").map(e => e.value).flat(1);

      files.forEach(file => {
        /*let ext = file.match(this.extensionRegex)[0].slice(1)
        let name = file.match(this.nameRegex)[0];
        let type = this.types[this.classifications[ext]];
        if (this[type]) return;
        console.log(type);*/
      })

      console.log("files", files);
    });
  }
  readDir(directory) {
    return new Promise((res, rej) => {
      fs.readdir(directory, (err, files) => {
        if (files) return res(files);
        rej(err);
      })
    });
  }
}

const loader = new AssetLoader();
loader.load();

module.exports = AssetLoader;
