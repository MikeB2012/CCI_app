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
    db.wordinfo.find({}).sort({index: 1}).exec(function(err,docs) {
      res.render('index', { title: 'CCI' , "descripbuttons": docs});
    });
  };
};


