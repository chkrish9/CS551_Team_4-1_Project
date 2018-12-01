import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StepsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-steps',
  templateUrl: 'steps.html',
})
export class StepsPage {
  steps:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.steps = [
      "Open the lid", "Clean inside", "Replace the belt", "Close the lid"
      
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepsPage');
  }

}
