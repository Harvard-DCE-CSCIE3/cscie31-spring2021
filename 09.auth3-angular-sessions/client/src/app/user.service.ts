import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable()
export class UserService {

  private apiurl = environment.apiurl;

  constructor(private http:HttpClient) { }

  getCurrentUser(){
    return this.http.get(this.apiurl + 'api/users/currentUser/', { withCredentials: true });
  }

}
