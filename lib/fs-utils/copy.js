const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);

module.exports = async (files, dir) => {
  const cmd = `cp ${files.join(' ')} ${dir}`;
  await exec(cmd);
};
