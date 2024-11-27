const express = require("express");
const animeRoutes = require("./routes/animeRoutes");

const app = express();
app.use(express.json());

// Register Routes
app.use("/anime", animeRoutes);

module.exports = app;
