"use strict";

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/descriptions')
  , http = require('http')
  , path = require('path')
  , tingo = require('tingodb')              // may use this vice nedb in future
  , database = require('./data/database');  //creates nedb databases
  ;

/**
 * Initialize Express as the variable 'app'.
 */ 
var app = express();

/**
 * Configure Express including specifying the view engine (Jade)
 * and the CSS engine (Stylus).  This is generated automatically
 * when you run Express with ""--css stylus" option.
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
app.get('/', routes.index(database.db));
app.post('/', routes.newAchievement(database.db) );
app.get('/display', function() {console.log('display');} );
app.get('/edit', function() {console.log('edit');} );
app.get('/delete', function() {console.log('delete');} );

/**
 *  Start the server
 */

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

