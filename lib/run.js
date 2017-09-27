const path = require('path');

const highlight = require('./highlight');
const render = require('./render');
const screenshot = require('./screenshot');
const copy = require('./fs-utils/copy');
const remove = require('./fs-utils/remove');

const resourceDir = path.resolve(__dirname, './resource');
const tempDir = path.resolve(process.cwd(), '__temp__');
const styles = [
  path.join(resourceDir, 'base.css'),
  path.join(resourceDir, 'default.css')
];
const htmlFile = path.join(tempDir, 'index.html');

module.exports = async options => {
  try {
    options = options || {};
    const { input, style } = options;
    if (!input) throw 'no input';

    // highlight code
    const code = await highlight(input);
    if (!code)  throw 'highlight error';

    // render html to temp folder
    const rendered = render(htmlFile, { code, style });
    if (!rendered) throw 'render error';

    // copy default stylesheets
    await copy(styles, tempDir);

    // take screenshot with chrome-headless
    options.url = 'file://' + htmlFile;
    await screenshot(options);

    // remove temp folder
    if (!options.debug) {
      await remove([ tempDir ]);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
