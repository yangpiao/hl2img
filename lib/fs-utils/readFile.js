const fs = require('fs');

module.exports = path => new Promise((resolve, reject) => {
  fs.lstat(path, (err, stat) => {
    if (err) {
      reject(err);
      return;
    }
    if (!stat.isSymbolicLink()) {
      fs.readFile(path, 'utf8', (err, contents) => {
        if (err) reject(err);
        else resolve(contents);
      });
    } else {
      reject(Error('symlink'));
    }
  });
});
