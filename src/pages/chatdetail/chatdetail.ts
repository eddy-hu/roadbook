import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, TextInput } from 'ionic-angular';
import { ChatserviceProvider, ChatMessage } from '../../providers/chatservice/chatservice';
import { Storage } from "@ionic/storage";
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-chatdetail',
  templateUrl: 'chatdetail.html',
})
export class ChatDetailPage {

  chartUserName: string;
  chatUserId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  isOpenEmojiPicker= false;
  messageList: ChatMessage[] = [];
  errorMessage: any;
  editorMessage: string;

  @ViewChild(Content) content: Content;
  @ViewChild('chatInput') messageInput: TextInput;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public chatService: ChatserviceProvider,
    public storage: Storage,
    public rest: RestProvider,
    ) {
    this.chartUserName = navParams.get('username');
    this.chatUserId = navParams.get('userid');
  }

  ionViewDidEnter(){
    this.storage.get("UserId").then(val => {
      if (val != null) {
        this.rest.getUserInfo(val).subscribe(
          userinfo => {
            this.userId = '140000198202211138';
            this.userName = userinfo["UserNickName"];
            this.userImgUrl = userinfo["UserHeadface"] + "?" + new Date().valueOf();
          },
          error => (this.errorMessage = <any>error)
        );
      }
    });

    this.getMessages()
    .then(()=>{
      this.scrollToBottom();
    })
  }


  switchEmojiPicker(){
    this.isOpenEmojiPicker=!this.isOpenEmojiPicker;
  }

  getMessages(){
    return this.chatService.getMessageList()
    .then(res =>{
      this.messageList = res;
    })
    .catch(err=>{
      console.error(err);
    })
  }

  sendMessage(){
    
  }

  focus(){
    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }
  
  scrollToBottom(): any{
    setTimeout(()=>{
      if(this.content.scrollToBottom){
        this.content.scrollToBottom();
      }
    },400)
  }
}
