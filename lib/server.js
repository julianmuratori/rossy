
// DEPENDENCIES
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const uri = "mongodb://juju:juju@ds125126.mlab.com:25126/bob-ross";

// SCHEMA IMPORTS
const Episode = require('./models/episode');
const User = require('./models/user');
const Userlist = require('./models/userlist');
const EpisodeDetails = require('./models/episodedetails');


mongoose.connect(uri);
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "hello world"
  });
});

// EPISODE COLLECTION

app.get('/episodes', (req, res) => {
  Episode.find()
    .then(docs => {
      res.status(200).json({
        message: "success",
        payload: docs
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
});

app.post('/episodes', (req, res) => {
  // grabs the info from the post request 
  const { title, season, episodeNumber, details } = req.body;

  // instantiates a new episode
  const episode = new Episode({
    title,
    season,
    episodeNumber,
    details
  })

  // save the post
  episode.save()
    .then(doc => {
      res
        .status(200)
        .json({
          message: "saved",
          payload: doc
        })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
})

// LIST OF EPISODE DETAILS

app.get('/search', (req, res) => {
  EpisodeDetails.find()
    .then(docs => {
      res.status(200)
        .json({
          message: "success",
          payload: docs
        })
    })
    .catch(err => {
      res.status(500)
        .json({
          message: err.message
        })
    })
})


// USER'S LIST COLLECTION

app.get('/mylists', (req, res) => {
  Userlist.find()
    .then(docs => {
      res.status(200).json({
        message: 'success',
        payload: docs
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
})

app.post('/mylists', (req, res) => {
  
  // grabs the list title and selected episodes from the request
  const { title, episodeList } = req.body;

  // instantiates a new list with provided info
  const list = new Userlist({
    title,
    episodeList
  })

  // saves the post
  list.save()
    .then(doc => {
      // successful post
      res.status(200).json({
          message: "success",
          payload: doc
        })
    })
    .catch(err => {
      // error response
      res.status(500).json({
        message: err.message
      })
    })
})



app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
