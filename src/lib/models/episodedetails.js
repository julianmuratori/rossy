const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailsSchema = new Schema({
  details: Array
});

module.exports = mongoose.model("EpisodeDetail", detailsSchema);
