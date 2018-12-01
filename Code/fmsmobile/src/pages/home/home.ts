import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tickets:any;
  constructor(public navCtrl: NavController) {
    this.tickets = [
      {
        "machineName":"Machine",
        "reason":"Belt failure"
      },
      {
        "machineName":"Machine 2",
        "reason":"Oil leaking"
      }
    ]
  }

}
