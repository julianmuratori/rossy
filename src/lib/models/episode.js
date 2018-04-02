const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    season: {
        type: Number,
        required: true
    },
    episodeNumber: {
        type: Number,
        required: true
    },
    details: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("Episode", episodeSchema);