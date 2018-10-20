import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import {  HomePage } from 

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }
  login()
  {
  var users = JSON.parse(localStorage.getItem("users"));
  var username = this.username;
  var password = this.password;
  if (this.username !== "" && this.password !== "") {
    var user = users.filter(function (el) {
      return (el.username === username && el.password === password)
    });
    if (user.length > 0) {
      localStorage.setItem("loggedInUser", JSON.stringify(user[0]));
      this.navCtrl.setRoot(HomePage);
    } else {
      this.presentToast("Invalid Username/Password.");
    }
  }else{
    this.presentToast("Please fill all the details and login.");
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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


