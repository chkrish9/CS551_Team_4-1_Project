import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MachinegroupService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addMachineGroup(machinegroup) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.authService.prepEndpoint('machinegroup/create');
    return this.http.post(url, machinegroup, { headers: headers });
  }

  updateMachineGroup(machinegroup) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = this.authService.prepEndpoint('machinegroup/update/');
    url = url + `${machinegroup._id}`;
    return this.http.put(url, machinegroup, { headers: headers });
  }

  deleteMachineGroup(id) {
    let url = this.authService.prepEndpoint('machinegroup/delete/');
    return this.http.delete(url + id);
  }

  getMachineGroups() {
    let url = this.authService.prepEndpoint('machinegroup/all');
    return this.http.get(url);
  }
}
