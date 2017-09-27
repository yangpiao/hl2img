const { exec } = require('child_process');

module.exports = paths => new Promise((resolve, reject) => {
  const cmd = `rm -rf ${paths.join(' ')}`;
  exec(cmd, err => {
    if (err) reject(err);
    else resolve();
  });
});
