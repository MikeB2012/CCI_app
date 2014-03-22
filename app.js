"use strict";

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , myk = require('./public/javascripts/myscripts')
  , http = require('http')
  , path = require('path')
  , nedb = require('nedb')
  , tingo = require('tingodb')
  ;

/**
 * Initialize Express as the variable 'app'
 * and create instances of the databases,
 * one for user achievement data and one for
 * the word data (word stats).
 */ 
var app = express();
/*
 * Create a database with two collections.
 * 'wordinfo' is a database with all the descriptor words.
 * It is populated in 'myscript.js' when 'myk' is created (see above)
 * 'userinfo' is created by the user entering their achievements and 
 * their contributions, the latter via 'descriptor buttons
 */
var db = {};
db.userinfo = new nedb();
db.wordinfo = myk.wordinfo;

/**
 * Configure Express including specifying the view engine (Jade)
 * and the CSS engine (Stylus).  This is generated automatically
 * when you run Express to create the directory structure, it's
 * just good to know.
 */
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * This tells server that if a request comes in for a page,
 * go to the appropriate file in the routes folder and get something
 * back e.g. a request for '/' triggers a call to 'index.js' that returns a 
 * rendering of 'index.jade' compiled to html.
 */
app.get('/', routes.index(db));
app.post('/', routes.newachievement(db));

/**
 *  Start the server
 */

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



