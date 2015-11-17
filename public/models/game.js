var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*JUST STARTING WORK ON THIS AS OF 11/16/15 NOT YET LIVE */
var gameSchema = mongoose.Schema({
 players: [],
 date: {type: Date, required: true},
 isCompleted: {type: Boolean},
 winners: [],
 turns: [],
 totals: []
});

var game = mongoose.model('game', gameSchema);

module.exports = game;
