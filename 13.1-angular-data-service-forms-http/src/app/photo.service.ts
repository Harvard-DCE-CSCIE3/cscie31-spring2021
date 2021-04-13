import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class PhotoService {
  // track maxId value, will be incremented when we create()
  maxId = 3;
  private apiurl = environment.apiurl;
  photoUrl = environment.photoUrl;

  constructor(private http:HttpClient) { }

  // two basic read methods follow: list and "getOne"
  listPhotos(){
    return this.http.get(this.apiurl + 'api/photos');
  }

  getPhoto(id){
    return this.http.get(this.apiurl + 'api/photos/' + id);
  }

  // Other CRUD methods TBD`
  createPhoto(photo: FormData){
    return this.http.post(this.apiurl+'api/photos', photo);
  }

  updatePhoto(id, data){
      return this.http.put(this.apiurl + 'api/photos/' + id, data);
  }

  deletePhoto(id){
    return this.http.delete(this.apiurl + 'api/photos/' + id);
  }

}
