const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodeDetails = new Schema({
  details: Array
});

module.exports = mongoose.model("EpisodeDetail", episodeDetails);
