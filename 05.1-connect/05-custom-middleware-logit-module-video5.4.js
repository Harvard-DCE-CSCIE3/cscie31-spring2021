// start by navigating to the /www folder, and type 'node ../05-custom-middleware-logit-module-video5.4'
// access the app from you browser at http://localhost:8080/index.html
var connect = require("connect");
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const app = connect();

// require our logging module
const logit = require('./logit-module');
// Call on our logging module only when the path contains /img
// in that case, the logit reuest handler middleware will run, and then call
// next to send the request/response on to the next request handler middleware
app.use('/img',logit);

app.use((req, res) => {
  // parse the URL into its component parts
	const parsedUrl = url.parse(req.url, true);
	const { pathname, query } = parsedUrl
	const absolute_path_to_file = path.join(process.cwd(), pathname);

	fs.readFile(absolute_path_to_file, (err, data) => {
		  if (err) {
	      console.log(err);
	      if (err.code == 'ENOENT'){
	        // file does not exist - we should return a 404 status code
					console.log('404 error getting ' + pathname);
					res.writeHead(404);
					res.end('404: Page Not Found!');
	      } else if (err.code == 'EISDIR'){
	        // this is actually a directory - we should create a directory listing
					console.log('directory listing ' + pathname);
					fs.readdir(absolute_path_to_file, (err, files)=>{
						if (err) {
							res.writeHead(500);
							res.end('Server Error 500');
						}
						let s = '<b>Directory Listing</b><br>';
						files.forEach((i)=>{
							s += (i + "<br>");
						});
						res.writeHead(200);
						res.end(s, 'utf8');
					});
	      }
	    } else {
		    // If we get to here, 'data' should contain the contents of the file
				res.writeHead(200);
				res.end(data, 'binary', ()=>{
					console.log("file delivered: " + pathname);
				});
		}
	});

});

var server = http.createServer(app);

var port = 8080;
server.listen(port, () => {
  console.log("Listening on " + port);
});
