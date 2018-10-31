import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController  } from 'ionic-angular';
import {  HomePage } from '../home/home';
import { AuthService } from '../../services/common/auth.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string = "";
  password: string ="";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public authService:AuthService
  ) {
  }
  login()
  {

    //login using local storage
  var users = JSON.parse(localStorage.getItem("users"));
  var username = this.username;
  var password = this.password;
  if (this.username !== "" && this.password !== "") {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if (data["success"]) {
        this.authService.storeUserData(data["token"], data["user"], data["privillages"]);
        console.log("Logged In");
        this.navCtrl.setRoot(HomePage);
      } else {
        this.presentToast("Invalid UserName/Password");
      }
    });
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


