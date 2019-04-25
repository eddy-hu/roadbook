import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
