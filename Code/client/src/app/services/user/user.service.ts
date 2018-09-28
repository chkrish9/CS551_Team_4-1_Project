import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { }

  addUser(user){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    let url = this.authService.prepEndpoint('users/create');
    return this.http.post(url, user,{headers: headers});
  }

  updateUser(user){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    let url = this.authService.prepEndpoint('users/create');
    url = url+`${user._id}`;
    return this.http.put(url, user,{headers: headers});
  }
}
