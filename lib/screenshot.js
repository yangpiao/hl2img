const path = require('path');
const puppeteer = require('puppeteer');

module.exports = async options => {
  let browser = null;
  try {
    const { url, width, output } = options;
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
      width: width || 600,
      height: 1,
      deviceScaleFactor: 2
    });
    const screenshotOptions = {
      path: output,
      fullPage: true
    };
    const type = getOutputType(output);
    if (type) screenshotOptions.type = type;
    if (type === 'jpeg') screenshotOptions.quality = 85;
    await page.screenshot(screenshotOptions);
  } catch (err) {
    throw err;
  } finally {
    if (browser && browser.close) {
      await browser.close();
    }
  }
};

function getOutputType(filename) {
  const ext = path.extname(filename).substring(1).toLowerCase();
  if (ext === 'jpg') return 'jpeg';
  return ext;
}
