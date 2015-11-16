/*******************************************
**EXPRESS SERVER FOR THE RUMMY ANGULAR APP**
*******************************************/

var express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rummy',
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    PORT = process.env.PORT || 3000;

/* HOOKING UP TO THE DATABASE *//////////
//connecting to mongoose
mongoose.connect(MONGOURI);
mongoose.set('debug', true);
var db = mongoose.connection;

//in event of a database error
db.on('error', console.error.bind(console, 'database connection error:'));

//if db successfully opened, then start listening on PORT and sent server.db = the database.
db.on('open', function() {
    server.listen(PORT);
    server.db = db;
    console.log('Hooked up to MongoDB and ready for action on port ' + PORT);
});

/**************** MIDDLEWARE *******************/
server.use(bodyParser.urlencoded({extended: true})); //for parsing web forms
server.use(bodyParser.json()); //for parsing JSON
server.use(express.static('./public')); //location of static files
server.use(morgan('short'));                        //activating morgan logging

//all '/users' routes in public/controllers/users.js
var userController=require('./public/controllers/users.js');
server.use(userController);

/************************************************************/
/****** GET request to root renders the Angular SPA *********/
/************************************************************/
server.get('/rummy2', function(req, res) {
  res.render('index');
});
