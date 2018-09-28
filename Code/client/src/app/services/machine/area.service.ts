import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addArea(area) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.authService.prepEndpoint('area/create');
    return this.http.post(url, area, { headers: headers });
  }

  updateArea(area) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.authService.prepEndpoint('area/update/');
    url = url + `${area._id}`;
    return this.http.put(url, area, { headers: headers });
  }

  deleteArea(id) {
    let url = this.authService.prepEndpoint('area/delete/');
    return this.http.delete(url + id);
  }

  getAreas() {
    let url = this.authService.prepEndpoint('area/all/');
    return this.http.get(url);
  }
}
