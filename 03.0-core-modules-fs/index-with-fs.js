// Code to go with video 3.15 - using modules to access process, filesystem
// This example deomonstrates the asynchronous nature of the http get() call
//   and the fs.writeFile() call. The console logging shows that the file
//   is saved out of sync with the chunks as they come in over http.
// Furthermore, the fetchedHTML.html file saved on line 24
//   will have only one chunck from the response saved, and it's not necessarily the
//   first one, or the last one, or even be the same one evach time you run it.

// usage:   node index-with-fs [url]]
// example: node index-with-fs http://www.google.com

// see command-line args from process object
console.log(process.argv);
// get the url from the command-line
var url = process.argv[2];

var h=require('http');
var fs = require('fs');
// get the URL requested in the command-line
h.get(url,
  function(response){
    response.setEncoding('utf8');
    // event handler for each chuck of data retreived via http
    response.on('data', function(d){
      console.log(d);  // log it to the console.
      // BTW - this is an awful solution to this problem and wont' work generally
      fs.writeFile('fetchedHTML.html', d, (err) => {
          if (err) throw (err);
          console.log("the file has been saved");
      });
    });

});
