import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI{

  id: string;
  errorMessage: any;
  content: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    public storage: Storage,
    public longdingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,

     ) {
       super();
       this.id= navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  submit(){
    this.storage.get("UserId").then(val => {
      if (val != null) {
        let loading = super.showLoading(this.longdingCtrl, "Uploading...");
        loading.present();
        this.rest.answer(val, this.id, this.content).subscribe(
          f => {
            if (f["Status"] == "OK") {
              loading.dismissAll();
              this.dismiss();
            } else {
              loading.dismissAll();
              super.showToast(this.toastCtrl, f["StatusContent"]);
            }
          },
          error => (this.errorMessage = <any>error)
        );
      } else {
        super.showToast(this.toastCtrl, "Please login to answer question");
      }
    });
  }
}
