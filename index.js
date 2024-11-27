require("dotenv").config();
const express = require("express");
const { ANIME } = require("@consumet/extensions");

const app = express();
const PORT = process.env.PORT || 3000;

// Create an instance of Gogoanime provider
const gogoanime = new ANIME.Gogoanime();

app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Anime API! 🎥");
});

// Search for anime
app.get("/anime/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const { page = 1 } = req.query;
    const results = await gogoanime.search(query, Number(page));
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Get anime info by ID
app.get("/anime/info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const info = await gogoanime.fetchAnimeInfo(id);
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Get streaming sources for an episode
app.get("/anime/watch/:episodeId", async (req, res) => {
  try {
    const { episodeId } = req.params;
    const sources = await gogoanime.fetchEpisodeSources(episodeId);
    res.json(sources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Get popular anime
app.get("/anime/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const results = await gogoanime.fetchPopular(Number(page));
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Get top airing anime
app.get("/anime/top-airing", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const results = await gogoanime.fetchTopAiring(Number(page));
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
