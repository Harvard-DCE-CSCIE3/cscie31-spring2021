const multer = require('multer');

// configure file upload storage
const storage = multer.diskStorage({
  // destination set to 'public/img'
  destination: function(req, file, cb) {
    cb(null, 'public/img');
  },
  // filename set to date prepended to original filename
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// only allow filenames ending in these common image extensions
const imageFilter = function(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
    cb(null, true);
  }  else {
    cb(new Error("OnlyImageFilesAllowed"), false);
 }
}

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;
