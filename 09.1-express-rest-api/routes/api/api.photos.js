//users.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const photoController = require('../../controllers/photoController');
const upload = multer({
  storage: photoController.storage,
  fileFilter: photoController.imageFilter
});
const PhotoService = photoController.PhotoService;

router.use((req, res, next)=>{
  res.set({
  // allow any domain, allow REST methods we've implemented
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
  // Set content-type for all api requests
    'Content-type':'application/json'
  });
  if (req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});

// read
router.get('/', (req, res, next)=>{
   PhotoService.list()
    .then((photos) => {
      console.log(`API: List images: ${photos}`);
      res.status(200);
      res.send(JSON.stringify(photos));
    });
  console.log("placeholder")
});

// read
router.get('/:photoid', (req, res, next)=>{
  console.log(`finding ${req.params.photoid}`);
  PhotoService.read(req.params.photoid)
    .then((photo) => {
     console.log(`Found images: ${photo}`);
     res.status(200);
     res.send(JSON.stringify(photo));
   }).catch((err)=>{
     res.status(404);
     res.end();
   });
});

//update
router.put('/:photoid', (req, res, next)=>{
  console.log(`putting ${req.params.photoid}`);
  let putdata = req.body;
  PhotoService.update(req.params.photoid, putdata)
    .then((updatedPhoto)=>{
      res.status(200);
      res.send(JSON.stringify(updatedPhoto));
    }).catch((err)=> {
      res.status(404);
      res.end();
    });
 });

 // this example with no file upload - image is passed in as a url
 /* router.post('/', async (req, res, next)=>{

   const photo  = {
       imageurl: req.body.imageurl,
       title: req.body.title,
       description: req.body.description
       }

  try{
     const photoSave = await PhotoService.create(photo);
     res.status(201);
     res.send(JSON.stringify(photo));
   }catch(err){
     console.log(err);
     throw new Error("PhotoSaveError", photo);
   }
 });
*/

//  This example wth file upload - not a pure JSON implementation
//  since the file comes in via POSTed FormData
router.post('/', upload.single('image'), async (req, res, next)=>{
  const path = "/static/img/" + req.file.filename;

  const photo  = {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      imageurl: path,
      title: req.body.title,
      filename: req.file.filename,
      size: req.file.size / 1024 | 0,
      description: req.body.description
      }

 try{
    const photoSave = await PhotoService.create(photo);
    res.status(201);
    res.send(JSON.stringify(photoSave));
  }catch(err){
    console.log(err);
    throw new Error("PhotoSaveError", photo);
  }
});

// delete
router.delete('/:photoid', (req, res, next)=>{
  let id = req.params.photoid;
  PhotoService.delete(req.params.photoid)
    .then((photo) => {
     console.log(`Deleted image: ${id}`);
     res.status(200);
     res.send(JSON.stringify(photo));
   }).catch((err)=> {
     res.status(404);
     res.end();
   });;
});

// error
router.use(function(err, req, res, next){
  console.error(err);
  res.status(500);
  res.end();
});

module.exports = router;
