const fs = require("node:fs");
const path = require("node:path");

class AssetLoader {
  assetDirs = [ "./assets" ];
  // TODO: caching

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
            getPath: function(path) {
              if (path.includes("/")) {
                let dirs = path.split("/");
                let getProp = (ds, o=this) => {
                  if (ds.length == 1) {
                    return o[ds[0]];
                  } else {
                    let d = ds.shift();
                    return getProp(ds, o[d]);
                  }
                }
                return getProp(dirs.slice(0, dirs.length - 1)).getPath(dirs[dirs.length - 1]);
              }
              return this.assetMap.get(path);
            },
            get: function(path) {
              let fp = this.getPath(path);
              if (!fp) return null;
              console.log(fp);
              return fs.readFileSync(fp);
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
            parentObj[currDirName].assetMap.set(name, directory + "/" + file);
          }
          r(parentObj[currDirName]);
        });
      }
      let dirs = [];
      this.assetDirs.forEach(d => {
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

/*const loader = new AssetLoader();
(async () => {
  await loader.load(); // gotta call this only once
  console.log(loader.images.get("Spotify/Overlay.png")); // same as the following examples
  console.log(loader.images.Spotify.get("Overlay.png"));
  console.log(loader.all.images.get("Spotify/Overlay.png"));
  console.log(loader.all.get("images/Spotify/Overlay.png"));
})();*/

module.exports = AssetLoader;
