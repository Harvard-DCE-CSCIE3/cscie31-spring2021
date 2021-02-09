// Code to go with video 3.15 - using modules to access process, filesystem
// This example handles the asynchronous nature of the http get() call
//   and file writing using a WriteStream. The console logging shows that the writestream
//   accumulates the chunks in order as they come in over http.
// In this case, the fetchedHTML.html file saved on when we close the writestream on line 33
//   will be a faithful representation of the contents fetched from the URL.
// We cover this kind of 'streams' solution in Week 4 (video 4.6), and in the 04.3-streams directory
//  in this github repo.

// usage:   node index-with-fs [url]]
// example: node index-with-fs http://www.google.com

var h=require('http');
var fs = require('fs');
h.get(url,
  function(response){
    response.setEncoding('utf8');
    // create a writeStream
    var ws = fs.createWriteStream('fetchedHTML.html');

    response.on('data', function(d){
      console.log(d);  // at first log it to the console.
      // write each chunk to the stream in sequence
      ws.write(d, (err) => {
        if (err) throw err;
        console.log("file creation continues");
      });
    });
    // Event handler listens for "finish" event. At this time, close the stream,
    //   which finalizes the writing of the file to disk.
    response.on('finish', (err) => {
        if (err) throw err;
        ws.close();
    });
});
