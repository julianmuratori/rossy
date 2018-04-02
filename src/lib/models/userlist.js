const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userList = new Schema({
  title: {
      type: String,
      required: true
  },
  episodeList: Array
});

module.exports = mongoose.model("Userlist", userList);
