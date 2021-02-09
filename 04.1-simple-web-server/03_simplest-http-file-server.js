// start by navigating to the /www folder, and type 'node ../01_simplest-http-file-server'
// access the app from you browser at http://localhost:8080/photos/index.html (or use any arbitrary path)

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
	console.log(req.url);

  // parse the URL into its component parts
	const parsedUrl = url.parse(req.url, true);
	console.log(parsedUrl);
  // extract the pathname and query properties
	const { pathname, query } = parsedUrl;

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

	      } else if (err.code == 'EISDIR'){
	        // this is actually a directory - we should create a directory listing

	      }
	    }
	    // If we get to here, 'data' should contain the contents of the file

		});
});

var port = 8080;
server.listen(port, () => {
  console.log("Listening on " + port);
});
