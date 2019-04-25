import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage'
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{

  mobile: any;
  password: any;
  errorMessage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    ) {
      super();
  }

  login(){
    var loading = super.showLoading(this.loadingCtrl,"Loading...");
    this.rest.login(this.mobile,this.password)
      .subscribe(
        f=>{
          if(f["Status"]=="OK"){
            //Login successfully
            this.storage.set('UserId',f["UserId"]);
            loading.dismiss();
            this.dismiss();
          }else{
            //login failed
            loading.dismiss();
            super.showToast(this.toastCtrl,f["StatusContent"]);
          }
        },
        error => this.errorMessage = <any>error);

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  pushRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
