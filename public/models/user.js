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

module.exports = user;
