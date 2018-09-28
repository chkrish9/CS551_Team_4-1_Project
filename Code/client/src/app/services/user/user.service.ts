import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.authService.prepEndpoint('users/create');
    return this.http.post(url, user, { headers: headers });
  }

  updateUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.authService.prepEndpoint('users/update/');
    url = url + `${user._id}`;
    return this.http.put(url, user, { headers: headers });
  }

  deleteUser(id) {
    let url = this.authService.prepEndpoint('users/delete/');
    return this.http.delete(url + id);
  }

  getUsers() {
    let url = this.authService.prepEndpoint('users/all/');
    return this.http.get(url);
  }

  getUserName(searchTerm){
    let url = this.authService.prepEndpoint('users/get/');
    return this.http.get(url+searchTerm);
  }
}
