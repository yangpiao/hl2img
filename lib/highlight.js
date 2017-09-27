const path = require('path');
const hljs = require('highlight.js');
const readFile = require('./fs-utils/readFile');

hljs.configure({
  tabReplace: '  '
});

module.exports = async (filename, lang) => {
  const code = await readFile(filename);
  lang = lang || path.extname(filename).substring(1);
  if (hljs.getLanguage(lang)) {
    return hljs.highlight(lang, code, true).value;
  } else {
    return hljs.highlightAuto(code).value;
  }
};
