// start by navigating to the folder that contains this file, and type 'node streams-example'
// access the app from you browser at http://localhost:8080/index.html

var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {

  const { pathname }  = url.parse(req.url);
  console.log("pathname is %s", pathname);

  console.log(__dirname);
  console.log(process.cwd());
  var filepath = path.join(process.cwd(), pathname);
  console.log("filepath is %s", filepath);

// Alternate (and not very robust) way to make sure the filepath
//  exists before we try to open it
 fs.stat(filepath, (err, stat) => {
   if (err && err.code=='ENOENT'){
     res.writeHead(404, {"Content-type" : "text/plain"});
     res.end("404 Not Found!");
     console.log("file not found!");
     return;
   }
   if (stat.isDirectory()){
     console.log("directory!");
     return;
   }

  // read file as a stream and send direct to response
  var rs = fs.createReadStream(filepath);
  res.writeHead(200);
  rs.on('data', (d)=> {
    res.write(d);
  });
  rs.on('end', (d)=> {
    res.end(d);
  });

  // read file as a stream and pipe to response
  //  uncomment this and comment the above section to try it
  /*
  var rs = fs.createReadStream(filepath);
  res.writeHead(200);
  rs.pipe(res);
  console.log("delievered %s", filepath);
  */

});

server.listen(port, () => {
  console.log("Listening on " + port);
});
