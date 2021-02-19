// borrows from example at https://github.com/senchalabs/connect

const connect = require('connect');
const http = require('http');

const app = connect();
// respond to all requests
app.use(function(req, res){
  res.end('Hello from Connect!\n');
});
//create node.js http server and listen on port
const server = http.createServer(app);
const port = 8080;
server.listen(port, () => {
  console.log("Listening on " + port);
});
