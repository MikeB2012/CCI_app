"use strict";
/*
 * GET home page.
 */

exports.index = function(db){
  console.log('Calling Index');  // Check to see that function was called.
  /*
   * Render the page from the jade files.
   * Create 'descriptor' buttons from db collection
   * for descriptor words.
   */
  return function(req,res) {
    db.wordinfo.find({}).sort({contribution: 1}).exec(function(err,docs) {
      db.userinfo.find({}).sort({TaskNumber: 1}).exec(function(err,tasks) {
        console.log(tasks + "tasks");
        res.render('index.jade', { title: 'CCI' , "descripbuttons": docs, "achievements": tasks});
      });
      
    });
  };
};


