const express = require("express");
const animeController = require("../controllers/animeController");

const router = express.Router();

// Welcome Route
router.get("/", animeController.welcome);

// Anime Routes
router.get("/search/:query", animeController.searchAnime);
router.get("/info/:id", animeController.getAnimeInfo);
router.get("/watch/:episodeId", animeController.getEpisodeSources);
router.get("/popular", animeController.getPopularAnime);
router.get("/top-airing", animeController.getTopAiringAnime);
router.get("/video-url/:episodeId", animeController.getEpisodeVideoUrl);

module.exports = router;
