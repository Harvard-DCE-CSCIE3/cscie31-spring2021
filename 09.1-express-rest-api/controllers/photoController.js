const multer = require('multer');
const Photo = require('../models/photoModel');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const imageFilter = function(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
    cb(null, true);
  }  else {
    cb(new Error("OnlyImageFilesAllowed"), false);
 }
}

class PhotoService {

  static create(obj){
    const photo = new Photo(obj);
    return photo.save();
  }

  static update(id, data){
      return Photo.findById(id)
       .then((photo)=>{
         photo.set(data);
         photo.save();
         return photo;
       });
  }

  static read(id){
    return Photo.findById(id)
      .then((photo)=>{
        // found
        return photo;
      });
  }

  static list(){
    return Photo.find({})
      .then((photos)=>{
        // found
        return photos;
      });
  }

  static delete(id){
    return Photo.deleteOne({_id: id})
      .then((obj)=>{
        //removed
        return obj;
      })
  }
}

module.exports.storage = storage;
module.exports.imageFilter = imageFilter;
module.exports.PhotoService = PhotoService;
