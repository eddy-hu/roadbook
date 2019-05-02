import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  errorMessage: any;
  notificationList: string[];
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl: LoadingController,
     public toastCtrl: ToastController,
     public rest: RestProvider,
     public storage: Storage,
     ) {
       super();
  }

  ionViewDidLoad() {
    this.storage.get("UserId").then(val => {
      if (val != null) {
        //load user info
        var loading = super.showLoading(this.loadingCtrl, "Loading...");
        this.rest.getUserNotifications(val).subscribe(
          res => {
            this.notificationList = res;
            if(loading){
              loading.dismissAll();
              loading=null;
            }
          },
          error => (this.errorMessage = <any>error)
        );
      }
    });
  }

  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id: questionId});
  }

}
