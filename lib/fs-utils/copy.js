const { exec } = require('child_process');

module.exports = (files, dir) => new Promise((resolve, reject) => {
  const cmd = `cp ${files.join(' ')} ${dir}`;
  exec(cmd, err => {
    if (err) reject(err);
    else resolve();
  });
});
