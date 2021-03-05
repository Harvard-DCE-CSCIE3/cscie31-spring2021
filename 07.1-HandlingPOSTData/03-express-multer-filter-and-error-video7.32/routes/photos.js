//users.js
const express = require('express');
const router = express.Router();
const app = express();
const multer = require('multer');
const photoController = require('../controllers/photoController');

const upload = multer({ storage: photoController.storage, fileFilter: photoController.imageFilter });

if(!app.locals.photolist){
  app.locals.photolist = [];
}

router.get('/', (req, res, next)=>{
  res.render('photos', {
    photos : app.locals.photolist
  });
  console.log("placeholder")
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

router.use(function(err, req, res, next){
  console.error(err.stack);
  if (err.message == "OnlyImageFilesAllowed"){
      res.send("Please select an image file with a jpg, png, or gif filename extension.");
  }else{
     next(err);
  }
});

module.exports = router;
