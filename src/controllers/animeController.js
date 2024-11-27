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
    console.log("Received request for popular anime, page:", page); // Debug log

    const results = await animeService.getPopularAnime(Number(page));
    console.log("Popular anime results:", results); // Debug log

    res.json(results);
  } catch (error) {
    console.error("Error in getPopularAnime controller:", error); // Log detailed error
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
