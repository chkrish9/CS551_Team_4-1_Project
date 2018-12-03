import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/common/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket;
  tickets:any;
  constructor(public navCtrl: NavController, public authService:AuthService, private http: HttpClient,) {
    this.getAllTickets().subscribe(data => {
      console.log(data);
      this.tickets = data;
    });
    this.socket = io.connect('http://localhost:3000');
  }

  ionViewDidLoad() {
    this.socket.on('newTicketCreated', () => {
      this.getAllTickets().subscribe(data => {
        console.log(data);
        this.tickets = data;
      });
     })
  }

  getAllTickets(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('maintenance/all/');
    return this.http.get(url, { headers: headers });
  }

}
