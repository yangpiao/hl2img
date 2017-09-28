const fs = require('fs');
const util = require('util');
const path = require('path');
const mkdir = require('./mkdir');
const writeFile = util.promisify(fs.writeFile);

module.exports = async (filepath, content) => {
  await mkdir(path.dirname(filepath));
  await writeFile(filepath, content);
};
