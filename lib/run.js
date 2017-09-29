const path = require('path');
const highlight = require('./highlight');
const render = require('./render');
const screenshot = require('./screenshot');
const copy = require('./fs-utils/copy');
const remove = require('./fs-utils/remove');

const resourceDir = path.resolve(__dirname, './resource');
const styleFiles = [
  path.join(resourceDir, 'base.css'),
  path.join(resourceDir, 'default.css')
];

module.exports = async options => {
  let tempDir = null;
  options = options || {};
  try {
    let { style, output } = options;
    if (!options.input) throw Error('Please specify an input file');
    if (style) {
      styleFiles.push(style);
      style = path.basename(style);
    }
    output = output || '';
    if (!path.extname(output)) {
      output = path.join(output, 'output.png');
    }
    output = path.resolve(process.cwd(), output);
    options.output = output;
    tempDir = path.join(path.dirname(output), '.hl2img_tmp');
    const htmlFile = path.join(tempDir, 'index.html');

    // highlight code
    const code = await highlight(options.input);
    // render html
    await render(htmlFile, { code, style });
    // copy stylesheets
    await copy(styleFiles, tempDir);
    // take screenshot with chrome-headless
    options.url = 'file://' + htmlFile;
    await screenshot(options);
  } catch (err) {
    console.error(err.message);
  } finally {
    // remove temp files
    if (!options.debug && tempDir) {
      try {
        await remove([ tempDir ]);
      } catch (err) {
        console.error('Failed to remove temp files:', err.message);
      }
    }
  }
};
