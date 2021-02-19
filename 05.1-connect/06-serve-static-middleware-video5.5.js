// start by navigating to the /www folder, and type 'node ../06-serve-static-middleware-video5.5'
// access the app from you browser at http://localhost:8080/
const connect = require("connect");
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const morgan = require('morgan');
const app = connect();

app.use(morgan('default'));
app.use(serveStatic(__dirname + "/www"));
app.use(serveIndex(__dirname + "/www"));

// serve-static and serve-index do not send 404 messages - they just pass the request on to the
//  next middleware if no such file or directory is found. So, we should handle that case here:
app.use((req, res)=>{
	res.writeHead(404);
	res.end('404: Page Not Found!');
});

var port = 8080;
app.listen(port, () => {
  console.log("Listening on " + port);
});
