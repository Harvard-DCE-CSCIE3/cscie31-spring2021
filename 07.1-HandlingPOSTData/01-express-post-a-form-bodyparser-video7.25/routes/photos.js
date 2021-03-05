//users.js
const express = require('express');
const router = express.Router();
const app = express();

if(!app.locals.photolist){
  app.locals.photolist = [];
}

router.get('/', (req, res, next)=>{
  res.render('photos', {
    photos : app.locals.photolist
  });

  console.log("placeholder")
});

// This example is of retreiving POST data from the body of the request
//  This is a deomonstration of how POST data is extracted from the body.
//  It is replaced with the bodyparser package in the following example,
//   which provides functionality for extracting data from a POST request
//   and adding it to a 'req.body' property.
/*
router.post('/', (req, res, next)=>{
  let formdata = '';
  req.on('data', (d)=>{
    formdata += d;
  });
  req.on('end', ()=>{
    console.log(formdata);
  });
  console.log(req);
});
*/

router.post('/', (req, res, next)=>{
  var photo  = {
    title: req.body.title,
    description: req.body.description,
    imageurl: req.body.imageurl
  }
  app.locals.photolist.push(photo);
  res.redirect("/photos");
});

module.exports = router;
