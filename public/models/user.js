var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*<><><><><><><><><><><><><><><><>*/
/*<><><><><>Schemas<><><><><><><>*/
var userSchema = mongoose.Schema({
 name: {type: String, required: true, minlength: 1, maxlength: 15, unique: true},
 record: {
   wins: {type: Number, required: true, min: 0},
   losses: {type: Number, required: true, min: 0},
   ties: {type: Number, required: true, min: 0}
 },
 dateCreated: {type: Date}
});

var user = mongoose.model('user', userSchema);

/*JUST STARTING WORK ON THIS AS OF 11/16/15 NOT YET LIVE */
var gameSchema = mongoose.Schema({
 players: [], //need to think about this. Will this contain the actual player objects, their IDs, which ... ?
 date: {type: Date, required: true},
 isCompleted: {type: Boolean},
 winners: [], //see above on players
 turns: [] //should be an array of turn scores
 /*ie.,
 [
    [15, 5, -10, -20],
    [25, 0, 0, 100], etc.
]  */
});

var game = mongoose.model('game', gameSchema);

// module.exports = {
//   user: user,
//   game: game
// }
module.exports = user;
