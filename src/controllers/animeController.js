const animeService = require("../services/animeService");

// Welcome Route
exports.welcome = (req, res) => {
  res.send("Welcome to the Anime API! 🎥");
};

// Search Anime
exports.searchAnime = async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1 } = req.query;
    const results = await animeService.search(query, Number(page));
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get Anime Info by ID
exports.getAnimeInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await animeService.getAnimeInfo(id);
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get Streaming Sources
exports.getEpisodeSources = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const sources = await animeService.getEpisodeSources(episodeId);
    res.json(sources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get Popular Anime
exports.getPopularAnime = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const results = await animeService.getPopularAnime(Number(page));
    res.json(results);
  } catch (error) {
    console.error("Error in getPopularAnime controller:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get Top Airing Anime
exports.getTopAiringAnime = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const results = await animeService.getTopAiringAnime(Number(page));
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get Streaming Video URL
exports.getEpisodeVideoUrl = async (req, res) => {
  try {
    const { episodeId } = req.params;
    console.log("Received request for video URL with episodeId:", episodeId);

    const videoUrl = await animeService.extractVideoUrl(episodeId);

    if (!videoUrl) {
      return res.status(404).json({ error: "Video URL not found!" });
    }

    res.json({ videoUrl });
  } catch (error) {
    console.error("Error in getEpisodeVideoUrl controller:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
