const fs = require('fs');
const path = require('path');
const mkdir = require('./mkdir');

module.exports = async (filepath, content) => {
  await mkdir(path.dirname(filepath));
  await writeToFile(filepath, content);
};

function writeToFile(filepath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, err => {
      if (!err) resolve();
      else reject(err);
    });
  });
}
