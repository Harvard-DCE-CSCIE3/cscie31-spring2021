
var fs = require('fs');
var gzip = require('zlib').createGzip();
var file = process.argv[2];

var rs = fs.createReadStream(file);
var ws = fs.createWriteStream(file+".gz");
rs.pipe(gzip).pipe(ws); 
