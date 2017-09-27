const fs = require('fs');

// similar to `mkdir -p`
module.exports = mkdirP;

async function mkdirP(dir) {
  const parent = await mkdir(dir);
  if (parent) {
    await mkdirP(parent);
    await mkdir(dir);
  }
}

function mkdir(dir) {
  if (!dir) {
    return Promise.resolve(null);
  }
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if (!err) {
        resolve(null);
      } else {
        switch (err.code) {
          case 'ENOENT':
            resolve(path.dirname(dir));
            break;
          case 'EEXIST':
            fs.lstat(dir, (statErr, stats) => {
              if (statErr || !stats.isDirectory()) {
                reject(err);
              } else {
                resolve(null);
              }
            });
            break;
          default:
            reject(err);
            break;
        }
      }
    });
  });
}
