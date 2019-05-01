import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatDetailPage } from '../chatdetail/chatdetail';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  userinfo: Object;
  ChatDetailPage: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userinfo = {
      userid: '1234',
      username: 'Ellie'
    }
    this.ChatDetailPage = ChatDetailPage;
  }

}
