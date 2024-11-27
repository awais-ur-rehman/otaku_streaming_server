const { ANIME } = require("@consumet/extensions");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const gogoanime = new ANIME.Gogoanime();

exports.search = async (query, page) => {
  return await gogoanime.search(query, page);
};

exports.getAnimeInfo = async (id) => {
  return await gogoanime.fetchAnimeInfo(id);
};

exports.getEpisodeSources = async (episodeId) => {
  return await gogoanime.fetchEpisodeSources(episodeId);
};

exports.getPopularAnime = async (page) => {
  return await gogoanime.fetchPopular(page);
};

exports.getTopAiringAnime = async (page) => {
  return await gogoanime.fetchTopAiring(page);
};

exports.extractVideoUrl = async (episodeId) => {
  const BASE_URL = "https://anitaku.bz";
  const episodeUrl = `${BASE_URL}/${episodeId}`;

  try {
    const browser = await puppeteer.launch({
      headless: true, // Use headless mode for production
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set a user agent to simulate a real browser
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    console.log("Navigating to:", episodeUrl);
    await page.goto(episodeUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    console.log("Extracting video URL...");
    // Wait for the presence of an iframe containing the video
    const iframeHandle = await page.waitForSelector("iframe", {
      timeout: 30000,
    });

    const iframeSrc = await iframeHandle.evaluate((iframe) => iframe.src);

    console.log("Navigating to iframe source:", iframeSrc);
    await page.goto(iframeSrc, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Wait for the video file URL
    const videoUrl = await page.evaluate(() => {
      const videoElement = document.querySelector(
        "video source[type='application/vnd.apple.mpegurl']"
      );
      return videoElement ? videoElement.src : null;
    });

    await browser.close();

    if (!videoUrl) {
      console.error("Video URL not found.");
      return null;
    }

    console.log("Extracted video URL:", videoUrl);
    return videoUrl;
  } catch (error) {
    console.error("Error extracting video URL:", error);
    return null;
  }
};
