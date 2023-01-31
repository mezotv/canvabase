const fs = require("node:fs");
const path = require("node:path");

class AssetLoader {
  assetDirs = [ "./assets" ];

  constructor(...sourceDirectories) {
    if (sourceDirectories.length != 0) this.assetDirs = sourceDirectories;
  }
  load() {
    return new Promise(async res => {
      var mapDirectories = (directory, parentObj=this, currDirName=null) => {
        return new Promise(async r => {
          var files = (await this.readDir(directory)).flat(1);
          var topLevel = false;
          if (!currDirName) {
            currDirName = "all";
            topLevel = true;
          }

          if (!parentObj[currDirName]) parentObj[currDirName] = {
            assetMap: new Map(),
            get: function() {
              console.log(this.assetMap);
            }
          };

          for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let ext = path.extname(file);
            if (!ext) {
              let obj = parentObj[currDirName];
              await mapDirectories(directory + "/" + file, obj, file);
              if (topLevel) {
                Object.defineProperty(parentObj, file, {
                  get: () => {
                    return parentObj[currDirName][file];
                  }
                });
              }
              continue;
            }
            let name = path.basename(file);
            parentObj[currDirName].assetMap.set(name, directory + "/file");
          }
          r(parentObj[currDirName]);
        });
      }
      let dirs = [];
      this.assetDirs.forEach(d => {
        //console.log(d, this);
        dirs.push(mapDirectories(d));
      });
      await Promise.allSettled(dirs);

      res(this);
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
(async () => {
  await loader.load();
  loader.all.images.Achievment.get();
})();

module.exports = AssetLoader;
