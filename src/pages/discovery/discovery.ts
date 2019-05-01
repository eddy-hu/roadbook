import { Component } from '@angular/core';
import { NavController, ModalController,  LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {

  questions: string[];
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
  ) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions(){
    let loading = super.showLoading(this.loadingCtrl,"Loading...");
    loading.present();
    this.rest.getQuestions()
    .subscribe(res=>{
      this.questions=res;
      if(loading){
        loading.dismiss();
        loading=null;
      }
    },
    error=>this.errorMessage = <any>error);
  }

  doRefresh(refresher){
    this.getQuestions();
    refresher.complete();
  }

  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id: questionId});
  }

}
