const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);

module.exports = async paths => {
  const cmd = `rm -rf ${paths.join(' ')}`;
  await exec(cmd);
};
