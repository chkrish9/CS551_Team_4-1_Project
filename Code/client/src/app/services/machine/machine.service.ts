import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addMachine(machine) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.authService.prepEndpoint('machine/create');
    return this.http.post(url, machine, { headers: headers });
  }

  updateMachine(machine) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.authService.prepEndpoint('machine/update/');
    url = url + `${machine._id}`;
    return this.http.put(url, machine, { headers: headers });
  }

  deleteMachine(id) {
    let url = this.authService.prepEndpoint('machine/delete/');
    return this.http.delete(url + id);
  }

  getMachines() {
    let url = this.authService.prepEndpoint('machine/all/');
    return this.http.get(url);
  }
}
