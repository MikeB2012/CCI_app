/*
 * This fuction is called to enable data entry.
 */

exports.newachievement = function(db){
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
                console.log(contribs);
                db.wordinfo.find({}).sort({index: 1}).exec(function(err,docs) {     //redundant code to populate buttons
                  res.render('index', { title: 'CCI' , "descripbuttons": docs, "achievements": contribs});
                  });
              }
            });
        }
    });
  };
};