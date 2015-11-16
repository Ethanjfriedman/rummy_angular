var express = require('express'),
    router = express.Router(),
    Game = require('../models/game.js');

    /**************** GAMES ROUTES *******************/

    router.get('/games/:id', function (req, res) {

    });
    //GET request to /games should supply a file from the database
    //with the game in the database (INDEX in RESTful routing)
    router.get('/games', function(req, res) {
      Game.find({}, function(error, games) {
        if (error) {
          console.error.bind(console, 'error pulling games from databse');
        } else {
          res.json({games: games});
        }
      })
    });

    //POST request to /games should add a new game to the database
    router.post('/games', function(req, res) {
      var newGame = new Game(req.body);

      newGame.save(newGame, function(error, savedGame) {
        if (error) {console.error.bind(console,'error saving game to database');
        } else {
          res.json({game: savedGame});
        }
      });
    });

    //FOLLOWING RESTFUL ROUTES WILL NOT BE MADE available
    //delete a game
    //modify (edit) a game

    module.exports = router;
