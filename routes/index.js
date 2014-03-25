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
      db.userinfo.find({}).exec(function(err,tasks) {
        console.log(tasks + "tasks");
        res.render('index.jade', { title: 'CCI' , "descripbuttons": docs, "achievements": tasks});
      });
      
    });
  };
};

exports.newAchievement = function(db){
  console.log('Called newachievement');
  return function(req,res) {
    
    /*
     *  Get achievement description and contributions from form.
     *  Need validation check 
     */
    var newAchievement = req.body.statement;
    var newContribution = req.body.contribution;

    console.log(newAchievement, newContribution);  //Quick look to make sure they are correct.
    
    // Insert the values in to the database.
    
    db.userinfo.insert([{
      achievement: newAchievement,
      contribution: newContribution
      }], function(err,contribs) {
        if (err) {
          res.send("There was a problem entering the data.");
        } else {
            console.log('Did insert.');
            db.userinfo.find({},function(err,contribs){
              if (err) {
                console.log('There\'s been an error!');
              } else {
                console.log(contribs + contribs.length);
                db.wordinfo.find({}).sort({index: 1}).exec(function(err,docs) {     //redundant code to populate buttons
                  res.render('index', { title: 'CCI' , "descripbuttons": docs, "achievements": contribs});
                  });
              }
            });
        }
    });
  };
};
