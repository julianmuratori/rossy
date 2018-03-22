
// DEPENDENCIES
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const uri = "mongodb://juju:juju@ds125126.mlab.com:25126/bob-ross";
const tokenService = require("./tokenService")
const bcrypt = require("bcrypt");

// SCHEMA IMPORTS
const Episode = require('./models/episode');
const User = require('./models/user');
const Userlist = require('./models/userlist');
const EpisodeDetail = require('./models/episodedetails');

// MIDDLEWARE
const auth = require('./middleware/authentication')

mongoose.connect(uri);
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// USER ACCOUNT CREATION

  app.post("/user", (req, res) => {
    
    // grabs the info from the post request
    const { email, password } = req. body;

    // instantiates a new user
    const user = new User({
      email,
      password
    })

    // saves that instance
    user
      .save()
      .then(doc => {
        // if successful, send back user
        res.status(200).json({
          message: "success",
          payload: doc
        })
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  })

// USER ACCOUNT LOGIN
  
  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
      if (user) {
        user
          // compare a user's hash to the password sent in the HTTP request body
          .comparePassword(password)
          .then(isMatch => {
            // if they match
            // send back the user
            if (isMatch) {
              
              // create a new token
              const token = tokenService.create(user)
              res.status(200).json({
                message: "success",
                payload: user
              });
            } else {
              // no match, send back a 401
              res.status(401).json({ message: "unauthorized" });
            }
          })
          // all other errors are 500s!
          .catch(err => {
            res.status(500).json({
              message: err.message
            });
          });
      } else {
        // no user found with the posted email
        res.status(401).json({
          message: "unauthorized"
        });
      }
    });
  });

  // // GETS CURRENT USER

app.get("/user/current", (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    res.status(401).json({
      message: "unauthorized"
    });
  }

  const token = authHeader.split(" ")[1]; // grab just the token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (decoded) {
      res.status(200).json({ decoded });
    } else {
      res.status(401).json({ message: "forbidden" });
    }
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
  EpisodeDetail.find()
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

app.post('/search', (req, res) => {
  // GRAB INFO FROM POST REQUEST
  const { details } = req.body;
  // INSTANTIATE NEW DETAIL
  const newDetail = new EpisodeDetail({
    details
  })

  // SAVE TO THE DB
  newDetail.save()
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
