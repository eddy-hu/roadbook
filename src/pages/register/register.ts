import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { BaseUI } from "../../common/baseui";
import { RestProvider } from "../../providers/rest/rest";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage extends BaseUI {
  mobile: any;
  nickname: any;
  password: any;
  confirmPassword: any;
  errorMessage: any;

  constructor(
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    super();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoLogin() {
    this.navCtrl.pop();
  }

  doRegister() {
    //form validation
    if (this.mobile.length != 10) {
      super.showToast(this.toastCtrl, "Phone number is invalid");
    } else if (this.nickname.length < 3 || this.nickname.length > 10) {
      super.showToast(this.toastCtrl, "Nick name is invalid");
    } else if (this.password.length < 6 || this.password.length > 20) {
      super.showToast(this.toastCtrl, "Password is invalid");
    } else if (this.confirmPassword.length < 6 || this.confirmPassword.length > 20 ) {
      super.showToast(this.toastCtrl, "Confirm Password is invalid");
    } else if (this.password != this.confirmPassword) {
      super.showToast(this.toastCtrl, "Passwords do not match");
    } else {
      var loading = super.showLoading(this.loadingCtrl, "Loading");
      this.rest.register(this.mobile, this.nickname, this.password).subscribe(
        f => {
          if (f["Status"] == "OK") {
            super.showToast(this.toastCtrl, "Sign up successfully");
            if(loading){
              loading.dismiss();
              loading=null;
            }
            this.dismiss();
          } else {
            if(loading){
              loading.dismiss();
              loading=null;
            }
            super.showToast(this.toastCtrl, f["StatusContent"]);
          }
        },
        error => (this.errorMessage = <any>error)
      );
    }
  }
}
