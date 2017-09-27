const puppeteer = require('puppeteer');

module.exports = async options => {
  let browser = null;
  try {
    const { output, url, width } = options;
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
      width: width || 600,
      height: 1,
      deviceScaleFactor: 2
    });
    await page.screenshot({
      path: output,
      type: 'png',
      fullPage: true
    });
  } catch (err) {
    throw err;
  } finally {
    if (browser && browser.close) {
      await browser.close();
    }
  }
};
