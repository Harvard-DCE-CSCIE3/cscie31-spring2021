//geturl example

// remember that this r is a ReadableStream
// See IncomingMessage and ReadableStream docs:
//    https://nodejs.org/api/stream.html#stream_class_stream_readable
//    on 'data' event as part of the ReadableStream interface

var h=require('http');
h.get('http://www.google.com/',
    function(r){
      console.log(typeof r);
      console.log(r.constructor.name);
      console.log(r.__proto__.__proto__.constructor.name);

      r.setEncoding('utf8');
      r.on('data', function(d){
        console.log(d);
      });
});
