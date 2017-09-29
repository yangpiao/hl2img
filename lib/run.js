const path = require('path');
const highlight = require('./highlight');
const render = require('./render');
const screenshot = require('./screenshot');
const copy = require('./fs-utils/copy');
const remove = require('./fs-utils/remove');

const resourceDir = path.resolve(__dirname, './resource');
const tempDir = path.resolve(process.cwd(), '__temp__');
const styleFiles = [
  path.join(resourceDir, 'base.css'),
  path.join(resourceDir, 'default.css')
];
const htmlFile = path.join(tempDir, 'index.html');

module.exports = async options => {
  options = options || {};
  try {
    const { input, style } = options;
    if (!input) throw Error('Please specify an input file');
    if (style) {
      styleFiles.push(style);
    }
    // highlight code
    const code = await highlight(input);
    // render html
    await render(htmlFile, { code, style: path.basename(style) });
    // copy stylesheets
    await copy(styleFiles, tempDir);
    // take screenshot with chrome-headless
    options.url = 'file://' + htmlFile;
    await screenshot(options);
  } catch (err) {
    console.error(err.message);
  } finally {
    // remove temp files
    if (!options.debug) {
      try {
        await remove([ tempDir ]);
      } catch (err) {
        console.error('Failed to remove temp files:', err.message);
      }
    }
  }
};
