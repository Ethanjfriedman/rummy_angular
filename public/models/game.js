/*JUST STARTING WORK ON THIS AS OF 11/16/15 NOT YET LIVE */
var gameSchema = mongoose.Schema({
 players: [], //need to think about this. Will this contain the actual player objects, their IDs, which ... ?
 date: {type: Date, required: true},
 isCompleted: {type: Boolean},
 winners: [], //see above on players
 turns: [] 
});

var game = mongoose.model('game', gameSchema);

module.exports = game;
