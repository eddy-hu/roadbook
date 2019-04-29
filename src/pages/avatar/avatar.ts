import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ActionSheetController,
  ModalController,
  ToastController,
  LoadingController,
  Platform,
  normalizeURL,
  ViewController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { BaseUI } from "../../common/baseui";
import { RestProvider } from "../../providers/rest/rest";

import { File } from "@ionic-native/file/ngx";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path/ngx";
import { Camera } from "@ionic-native/camera/ngx";

declare var cordova: any;

@Component({
  selector: "page-avatar",
  templateUrl: "avatar.html"
})
export class AvatarPage extends BaseUI {
  userId: string;
  errorMessage: string;
  lastImange: string = null;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public rest: RestProvider,
    public modalCtrl: ModalController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public filePath: FilePath,
    public platform: Platform,
    public file: File,
    public transfer: Transfer
  ) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get("UserId").then(val => {
      if (val != null) {
        this.userId = val;
      }
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Choose image",
      buttons: [
        {
          text: "From Album",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientaion: true
    };

    this.camera.getPicture(options).then(
      imagePath => {
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          let correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          let currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      err => {
        super.showToast(
          this.toastCtrl,
          "Error! Please check the permission or try it again"
        );
      }
    );
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          this.lastImange = newFileName;
        },
        error => {
          super.showToast(this.toastCtrl, "Save image failed");
        }
      );
  }

  createFileName() {
    return new Date().getTime() + ".jpg";
  }

  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }

  uploadImage() {
    let url = "https://imoocqa.gugujiankong.com/api/account/uploadheadface";
    let targetPath = this.pathForImage(this.lastImange);
    let fileName = this.userId + ".jpg";
    let options = {
      fileKey: "file",
      fileName: fileName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { fileName: fileName, userid: this.userId }
    };

    const fileTransfer: TransferObject = this.transfer.create();
    var loading = super.showLoading(this.loadingCtrl, "Uploading...");

    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "Uploaded successfully");
      setTimeout(() => {
        this.viewCtrl.dismiss();
      }, 3000);
    },err=>{
      loading.dismiss();
      super.showToast(this.toastCtrl, "Upload failed");
    });
  }
}
