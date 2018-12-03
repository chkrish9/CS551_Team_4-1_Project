import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/common/auth.service';

/**
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {
  reasons: any;
  machines: any;
  ticket = {
    "machineName": "",
    "reasonName": "",
    "machineId": "",
    "reasonId": "",
  }
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public authService: AuthService, private http: HttpClient, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
    this.getAllReasons().subscribe(data => {
      this.reasons = data;
      console.log(data);
    });
    this.getMachines().subscribe(data => {
      this.machines = data;
      console.log(data);
    });
  }

  getAllReasons() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('reason/all/');
    return this.http.get(url, { headers: headers });
  }

  getMachines() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('machine/all/');
    return this.http.get(url, { headers: headers });
  }

  createTicket() {
    this.ticket.machineName = this.machines.filter(el => {
      return el._id === this.ticket.machineId;
    })[0].name;
    this.ticket.reasonName = this.reasons.filter(el => {
      return el._id === this.ticket.reasonId;
    })[0].name;
    console.log(this.ticket);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
    let url = this.authService.prepEndpoint('maintenance/create');
    this.http.post(url, this.ticket, { headers: headers }).subscribe(data => {
      this.presentToast("Ticket Created.");
    })
  }

  /*
    This method will show the Toast messages.
  */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
