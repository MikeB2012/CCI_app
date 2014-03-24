"use strict";

console.log('Running database');
/*
 * Read a .csv file that contains a list
 * of all the descriptors for tasks.
 */

var nedb = require('nedb');
var fs = require('fs');
var filename = './data/descriptors.csv';  // location of .csv file

/*
 * Initialize two databases:
 *    wordinfo - all word descriptors
 *    userinfo - keeper of user entered data ie.- achievments, contributions
 */
var db = {};
db.wordinfo = new nedb();
db.userinfo = new nedb();

/*
 * Populate db.wordinfo
 */

var descriptors = fs.readFileSync(filename, 'utf-8');   //read file _synchronously
descriptors = descriptors.split('\r\n');                //convert to an array
descriptors.forEach( function (descriptor) {            //Fill in the database with "descriptors"
  db.wordinfo.insert({
    contribution: descriptor
  });
});

console.log("number of descriptors is: " + descriptors.length);

db.userinfo.count({}, function (err, count) {
  console.log("number of achievements is: " + count);
});

module.exports = {
  db: db,
  descriptors: descriptors  //make array callable from this module.
};

/*
 * QUICK TEST to verify descriptor dbase
 * is created and functional.
 * Uncomment to use.
 */
/*
db.wordinfo.find({}).sort({contribution: 1}).exec(function(err,docs) {
  console.log(docs);
});
*/


/*
 * The following is a working streaming file reader.
 * It is not used yet, the code is retained for 
 * future work.
 * 
 * 
var readStream=require("fs").createReadStream("./public/descriptor_data/descriptors.csv");

var writeStream=require("fs").createWriteStream("./public/user_data/descriptorsout.json");

var started=false;

csvConverter.on("record_parsed",function(rowJSON){
   if (started){
      writeStream.write(",\n");
   }
   writeStream.write(JSON.stringify(rowJSON));  //write parsed JSON object one by one.
   if (started===false){
      started=true;
   }
});

writeStream.write("[\n"); //write array symbol

csvConverter.on("end_parsed",function(){
   writeStream.write("\n]"); //end array symbol
});

csvConverter.from(readStream);

 */
