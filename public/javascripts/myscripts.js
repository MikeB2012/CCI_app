/**
 * @author Dad
 */

console.log('Running myscripts');
/*
 * Read a .csv file that contains a list
 * of all the descriptors for tasks.
 */
var fs = require('fs');
var filename = './public/descriptor_data/descriptors.csv';  // location of .csv file

var descriptors = fs.readFileSync(filename, 'utf-8');  //read file _synchronously
descriptors = descriptors.split('\r\n');  //convert to an array

exports.descriptors = descriptors;  //make array callable from this module.

/*
 *  Fill the database of descriptors
 *  Create and insert an index value so database is populated
 * with {index, descriptor} pairs.
 */
var nedb = require('nedb');
var testinfo = new nedb({filename: '/public/descriptor_data/worddata', inMemoryOnly: 'true'}); 

for (var i=0 ; i< descriptors.length-1; i++) {
  var temp = {};
  temp.index = i;
  temp.value = descriptors[i];
  testinfo.insert(temp, function(err,newDoc) {
    //console.log('Word data loaded.');
  });
};

exports.wordinfo = testinfo;


/*
 * QUICK TEST to verify descriptor dbase
 * is created and functional.
 * Uncomment to use.
 */
/*
testinfo.find( { $and: [{index: {$lte: 10}},{index: {$gt: 5}}] }).sort({index: 1}).exec(function(err,docs) {
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




