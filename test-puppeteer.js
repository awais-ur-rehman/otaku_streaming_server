const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch();
    console.log("Chromium successfully launched!");
    await browser.close();
  } catch (error) {
    console.error("Error launching Puppeteer:", error);
  }
})();
