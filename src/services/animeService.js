const { ANIME } = require("@consumet/extensions");

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
