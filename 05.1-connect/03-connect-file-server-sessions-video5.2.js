// start by navigating to the /www folder, and type 'node ../03-connect-file-server-sessions-video5.2'
// access the app from you browser at http://localhost:8080/index.html
const connect = require("connect");
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = connect();
app.use(session({
	secret: "cscie31",
	resave: true,
	saveUninitialized: true
}));

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
				// Update the session data here:
				if (req.session.views) {
			      req.session.views++
			  } else {
			    req.session.views = 1;
			  }
			  console.log("Session ID is %s, number visits this session: %s", req.session.id, req.session.views);

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
