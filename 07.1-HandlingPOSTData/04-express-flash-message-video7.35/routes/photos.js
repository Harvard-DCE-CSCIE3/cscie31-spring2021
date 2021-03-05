//users.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const photoController = require('../controllers/photoController');
const flash = require('connect-flash');
const upload = multer({
  storage: photoController.storage,
  fileFilter: photoController.imageFilter
});
const app = express();

if(!app.locals.photolist){
  app.locals.photolist = [];
}

router.use(flash());

router.get('/', (req, res, next)=>{
  res.render('photos', {
    photos : app.locals.photolist,
    flashMsg: req.flash("fileUploadError")
  });
});

router.post('/', upload.single('image'), (req, res, next)=>{
  var photo  = {
    title: req.body.title,
    description: req.body.description,
    imageurl: "/static/img/" + req.file.filename
  }
  app.locals.photolist.push(photo);
  res.redirect("/photos");
});

// catch errors here
router.use(function(err, req, res, next){
  console.error(err.stack);
  // if the error came from our imageFilter, set the flash message and redirect to the form
  if (err.message == "OnlyImageFilesAllowed"){
      req.flash('fileUploadError', "Please select an image file with a jpg, png, or gif filename extension.");
      res.redirect('/photos');
  }else{
    // otherwise, let express handle the error in the usual way
     next(err);
  }
});

module.exports = router;
