const fs = require('fs');
const util = require('util');
const lstat = util.promisify(fs.lstat);
const readFile = util.promisify(fs.readFile);

module.exports = async path => {
  const stat = await lstat(path);
  if (!stat.isSymbolicLink()) {
    return await readFile(path, 'utf8');
  } else {
    throw Error('Symlink is not supported');
  }
};
