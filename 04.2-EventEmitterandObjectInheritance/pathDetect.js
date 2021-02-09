
var UrlCheck = require('./urlCheck');

UrlCheck.on('image', function(u){
  console.log('PathDetect detected an \'image\' Event: image path requested');
});

module.exports = {};
