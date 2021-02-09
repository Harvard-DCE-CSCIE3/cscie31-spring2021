var h=require('http');
var fs = require('fs');

console.log(process.argv);
var url = process.argv[2];

h.get(url,
  function(response){
    response.setEncoding('utf8');
    response.on('data', function(d){
      console.log(d);  // log it to the console.

      fs.writeFile('fetchedHTML.html', d, (err) => {
      if (err) throw err;
        console.log('The file has been saved!');
      });

    });
});
