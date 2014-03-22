"use strict";
/*
    CSV Reader
    Author:  Tudor Nita | cgrats.com
    Version: 0.2
    
    Brief:  Singleton pattern
    Brief:  Reads-in a comma separated file.
    Brief:  Does not care what the data will be used for. 
    Brief:  Stores every line ( and all the line's members ) in the dataArray as a single entry
    Brief:  Automatically casts numerical values
    
    Get:    if(csvReader.ready) x = fileData[y][z];
    
    Bugs:   Does not work in CHROME
    Bugs:   Not completely csv compatible as it's built for my own specific needs and not the official specs
    
    csv format should look like:
    # comment line - disregarded by the parser
    value,value,value,value\n
    OR
    value;value;value;value\n

*/
csvReader =  new function() {

    var me = this;              // pointer to ourselves
    me.ready = false;           // are we done with reading the file ?
    me.debug = true;            // are we in debug mode ?
    me.fileData = new Array();  // line data array
    
    /* read file - event callback from the file input box */
    me.readFileEvent = function (event) {
    
        me.fileData.length = 0; // make sure the array is clear
        me.ready = false;       // set ready to false
        
        // the files, reader and string handler
        var files = event.target.files;
        var reader = new FileReader();
        var str;

        // parse the file - reader is async
        reader.onload = function(theFile) {  
            
            
            str = theFile.target.result;            // load file values
            var lines = str.split(/[\r\n|\n]+/);    // split data by line
            
            // for every line, remove formatting characters
            for(i=0;i<lines.length;i++) {
            
                lines[i]  = lines[i].replace(/(\r\n|\n|\r|)/gm,"").split(/[,;]+/);          // remove formatting and split by comma OR semi colon
                lines[i]  = lines[i].filter( function(x){ if( x!= "" )return true; } );     // filter out null members
                
                //if it isn't a comment line
                if(lines[i][0][0] != "#") {
                
                    // cast all members to correct type 
                    for(x =0;x< lines[i].length;x++) {
                        // try float
                        var result = parseFloat(lines[i][x]);
                        
                        // check if cast ok and set value
                        if( !isNaN(result) )
                            lines[i][x] = result;
                    }
                    // push line 
                    me.fileData.push(lines[i]);
                }
            }       
            // done, set ready
            me.ready = true;
            // if in debug, dump data to console
            me.consoleDump();
        };
        reader.onerror = function() { console.log('Error reading file');};       // error message    
        reader.readAsText(files[0]);                                             // start reading the text, async
    };
    
    /* dump the file data to the console */
    me.consoleDump = function() {
    
        if(!me.ready || !me.debug)
            return null;
        var end = me.fileData.length;
        for(i=0; i<end; i++)
            console.log(me.fileData[i]);
    };
};

 // set up an event for the file <input> element
document.getElementById('files').addEventListener('change', csvReader.readFileEvent, false);