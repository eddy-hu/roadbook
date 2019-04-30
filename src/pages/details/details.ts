import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  ModalController
} from "ionic-angular";
import { BaseUI } from "../../common/baseui";
import { RestProvider } from "../../providers/rest/rest";
import { Storage } from "@ionic/storage";
import { AnswerPage } from "../answer/answer";

@Component({
  selector: "page-details",
  templateUrl: "details.html"
})
export class DetailsPage extends BaseUI {
  id: string;
  userId: string;
  question: string[];
  answers: string[];
  errorMessage: any;
  isFavourite: boolean;
  isMyQuestion: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.loadQuestion(this.id);
  }

  loadQuestion(id) {
    this.storage.get("UserId").then(val => {
      if (val !== null) {
        this.userId = val;
        let loading = super.showLoading(this.loadingCtrl, "Loading...");
        this.rest.getQuestionWithUser(id, val).subscribe(
          res => {
            this.question = res;
            this.answers = res["Answers"];
            this.isFavourite = res["IsFavourite"];
            this.isMyQuestion = (res["OwnUserId"] == val);
            if(loading){
              loading.dismiss();
            }
          },
          error => (this.errorMessage = <any>error)
        );
      }
    });
  }

  saveFavourite() {
    let loading = super.showLoading(this.loadingCtrl, "Loading...");
    this.rest.saveFavourite(this.id, this.userId).subscribe(
      res => {
        if (res["Status"] == "OK") {
          if(loading){
            loading.dismiss();
          }
          super.showToast(
            this.toastCtrl,
            this.isFavourite
              ? "Unsubscribed successfully"
              : "Subscribed successfully"
          );
          this.isFavourite = !this.isFavourite;
        }
      },
      error => (this.errorMessage = <any>error)
    );
  }

  showAnswerPage(){
    let modal = this.modalCtrl.create(AnswerPage,{"id": this.id});
    //refresh page after close the modal
    modal.onDidDismiss(()=>{
      this.loadQuestion(this.id);
    });
    modal.present();
  }
}
