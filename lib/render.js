const path = require('path');
const readFile = require('./fs-utils/readFile');
const writeFile = require('./fs-utils/writeFile');

module.exports = async (filename, data) => {
  try {
    if (!filename) throw 'Output filename is not specified';
    data = data || {};
    data.style = data.style || 'default.css';
    const template = await readFile(
      path.resolve(__dirname, './resource/template.html'));
    let output = template;
    Object.keys(data).forEach(key => {
      output = output.replace(`{{${key}}}`, data[key]);
    });
    await writeFile(filename, output);
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
};
