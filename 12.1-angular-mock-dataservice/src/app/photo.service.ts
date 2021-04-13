import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
  maxId:number = 3;
  photoList = [
    {
      _id: 1,
      title:'Dogs Again',
      description:'this is my first photo',
      imageurl:'assets/img/champ-wheelin-on-the-beach.jpg'
    },
    {
      _id: 2,
      title:'Dogs Again 2',
      description:'this is my second photo',
      imageurl:'assets/img/ripley-and-tilda.jpg'
    },
    {
      _id: 3,
      title:'Dogs Again 3',
      description:'this is my third photo',
      imageurl:'assets/img/dogs2.jpg'
    }
  ];

  constructor() { }

  listPhotos(){
    return this.photoList;
  }

  getPhoto(id){
    return this.photoList.find((el) => {return el._id == id});
  }
  createPhoto(photoObject){
    if (!photoObject._id){
      photoObject._id = ++this.maxId;
    }
    this.photoList.push(photoObject);
    return this.photoList[photoObject._id];
  }

  updatePhoto(id, data){
    let photo = this.getPhoto(id);
    if (photo){
      photo = Object.assign(photo, data);
      return photo;
    } else {
      return null;
    }
  }

  deletePhoto(id){
    let photo = this.getPhoto(id);
    if (photo){
        this.photoList = this.photoList.filter(el => el._id != id);
    }
  }
}
