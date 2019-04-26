import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { BaseUI } from "../../common/baseui";
import { RestProvider } from '../../providers/rest/rest';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
/**
 * Generated class for the AvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-avatar',
  templateUrl: 'avatar.html',
})
export class AvatarPage extends BaseUI {

  userId: string;
  errorMessage: string;
  lastImange: string = null;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public rest: RestProvider,
    public modalCtrl: ModalController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public filePath: FilePath,
    public platform: Platform,
    public file: File,
    public transfer: Transfer,
   
  ) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
        this.userId=val;
      }
    });
  }

  presentActionSheet(){
    let actionSheet =  this.actionSheetCtrl.create({
      title: 'Choose image',
      buttons: [
        {
          text: 'From Album',
          handler: ()=>{

          }
        },
        {
          text: 'Use Camera',
          handler: ()=>{
            
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType){
    var options ={
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientaion: true
    }

    this.camera.getPicture(options).then((imagePath)=>{

    });
  }

}
