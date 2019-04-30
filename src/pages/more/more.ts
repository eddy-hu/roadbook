import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, LoadingController, ToastController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { UserPage } from "../user/user";
import { Storage } from "@ionic/storage";
import { BaseUI } from "../../common/baseui";
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-more",
  templateUrl: "more.html"
})
export class MorePage extends BaseUI {
  public notLogin: boolean = true;
  public logined: boolean = false;
  avatar: string;
  userInfo: string[];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public rest: RestProvider,
    public modalCtrl: ModalController,
    public storage: Storage
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
        var loading = super.showLoading(this.loadingCtrl,"Loading...");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo=>{
              this.userInfo=userinfo;
              this.avatar=userinfo["UserHeadface"] + "?"+ (new Date()).valueOf();
              this.notLogin = false;
              this.logined = true;
              if(loading){
                loading.dismiss();
              }
            }
          );
      } else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(()=>{
      this.loadUserPage();
    });
    modal.present();
  }

  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }

}
