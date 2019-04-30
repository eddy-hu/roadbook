import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  ViewController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { BaseUI } from "../../common/baseui";
import { RestProvider } from "../../providers/rest/rest";
import { AvatarPage } from "../avatar/avatar";

@Component({
  selector: "page-user",
  templateUrl: "user.html"
})
export class UserPage extends BaseUI {
  avatar: string =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxGk66K54MOa-94TfkVmJ8A6YIy_an1tpmhzmFc-K0ZK322Su";
  nickname: string = "loading...";
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: Storage,
    public viewCtrl: ViewController,
  ) {
    super();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get("UserId").then(val => {
      if (val != null) {
        //load user info
        var loading = super.showLoading(this.loadingCtrl, "Loading...");
        this.rest.getUserInfo(val).subscribe(
          userinfo => {
            this.nickname = userinfo["UserNickName"];
            this.avatar = userinfo["UserHeadface"] + "?" + new Date().valueOf();
            if(loading){
              loading.dismiss();
            }
          },
          error => (this.errorMessage = <any>error)
        );
      }
    });
  }

  updateNickName() {
    this.storage.get("UserId").then(val => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, "Updating...");
        this.rest.updateNickName(val, this.nickname).subscribe(f => {
          if (f["Status"] == "OK") {
            if(loading){
              loading.dismiss();
            }
            super.showToast(this.toastCtrl, "Nick name has been updated");
          } else {
            if(loading){
              loading.dismiss();
            }
            super.showToast(this.toastCtrl, f["StatusContent"]);
          }
          
        });
      }
    });
  }

  logout(){
    this.storage.remove("UserId");
    this.viewCtrl.dismiss();
  }
  gotoAvatar(){
    this.navCtrl.push(AvatarPage);
  }
}
