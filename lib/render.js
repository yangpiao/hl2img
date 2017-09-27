const path = require('path');
const readFile = require('./fs-utils/readFile');
const writeFile = require('./fs-utils/writeFile');
const TEMPLATE = './resource/template.html';
const DEFAULT_CSS = 'default.css';

module.exports = async (filename, data) => {
  if (!filename) throw Error('Output filename is not specified');
  data = data || {};
  data.style = data.style || DEFAULT_CSS;
  const template = await readFile(path.resolve(__dirname, TEMPLATE));
  let output = template;
  Object.keys(data).forEach(key => {
    output = output.replace(`{{${key}}}`, data[key]);
  });
  await writeFile(filename, output);
};
