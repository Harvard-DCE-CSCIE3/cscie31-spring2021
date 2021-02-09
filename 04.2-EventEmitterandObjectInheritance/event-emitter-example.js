// start by navigating to the /www folder, and type 'node ../event-emitter-example'
// access the app from you browser at http://localhost:8080/photos/image/hes-shield.jpg

var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var urlCheck = require('./urlCheck');
require('./pathDetect');

var server = http.createServer((req, res) => {
	console.log(req.url);
  // parse the URL into its component parts
	const parsedUrl = url.parse(req.url, true);
	console.log(parsedUrl);
  // extract the pathname and query properties
	const { pathname, query } = parsedUrl;

  // Call on the EventEmitter to send an application-wide event if
  //  the path has /image/ in it.
  urlCheck.check(pathname);

	// output absolute path info
	console.log('__dirname is %s', __dirname);
	console.log('cwd is %s', process.cwd());

	// Create an absolute path to the requested file.
	// Assume the server was started from the webroot
	const absolute_path_to_file = path.join(process.cwd(), pathname);
	console.log('absolute_path_to_file is %s', absolute_path_to_file);

	fs.readFile(absolute_path_to_file, (err, data) => {
	  if (err) {
      console.log(err);
      if (err.code == 'ENOENT'){
        // file does not exist - we should return a 404 status code
				console.log('404 error getting ' + pathname);
				res.writeHead(404, {"Content-Type": "text/plain"});
				res.end('404: Page Not Found!');
      } else if (err.code == 'EISDIR'){
        // this is actually a directory - we should create a directory listing
				console.log('directory listing ' + pathname);
				fs.readdir(absolute_path_to_file, (err, files)=>{
					if (err) {
						res.writeHead(500, {"Content-Type": "text/plain"});
						res.end('Server Error 500');
					}
					let s = '<b>Directory Listing</b><br>';
					files.forEach((i)=>{
						s += (i + "<br>");
					});
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.end(s, 'utf8');
				});
      }
    } else {
	    // If we get to here, 'data' should contain the contents of the file
			res.writeHead(200);
			//res.writeHead(200, {"Content-type": "application/pdf"});
			res.end(data, 'binary', ()=>{
				console.log("file delivered: " + pathname);
			});
		}
	});
});
var port = 8080;
server.listen(port, () => {
  console.log("Listening on " + port);
});
