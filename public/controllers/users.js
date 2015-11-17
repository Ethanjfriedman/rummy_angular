var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js');

/**************** USERS ROUTES *******************/
//GET request to /users should supply a file from the database
//with the users in the database (INDEX in RESTful routing)
router.get('/users', function(req, res) {
  User.find({}, function (error, users) {
    if (error) {
      console.log('error pulling up users from database');
      console.log(error);
    } else {
      res.json({users: users});
    }
  });
});

//POST request to /users should add a new user to the database
//(CREATE in RESTful routing)
router.post('/users', function(req, res) {
  //parse req.body (with body-parser) and store the resulting object in a new Mongoose User schema
  var newUser = new User(req.body);

  //search in the database for a pre-existing user with that same name
  //TODO move this code to its own function.
  User.findOne({name: newUser.name}, function (error, user) {
    if (error) {
      console.log("error searching for user by name in db");
      console.log(error)
      res.json({error: "unknown error when searching for user by name in db"})
    } else if (user !== null) {
      //user SHOULD be null; if not null then client is attempting to save a user to the db with a pre-existing name
      console.log("pre-existing user by that name in the db");
      res.json({error: "There is already a user by that name in the database. Please choose a different name."})
    } else {
      newUser.save(newUser, function(error, savedUser) {
        if (error) {
          console.log("error saving new user to the database");
          res.json({error: "error saving new user to the database"})
        } else {
          console.log("user successfully saved to the database");
          res.json({user: savedUser});
        }
      });
    }
  });
});

router.patch('/users/:id', function(req, res) {
  var user= req.body;
  User.findByIdAndUpdate()
  Model.findByIdAndUpdate(user._id,
    { record:
      { wins: user.record.wins, losses: user.record.losses, ties: user.record.ties
      }
    }, function(error, updated) {
      if (error) {
        console.log(error);
      } else {
        console.log(updated);
        res.json({user: updated});
      }
    });
});

//TODO
//DELETE A USER
//MODIFY A USER

module.exports = router;
