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
    if(!this.editorMessage.trim()){
      return;
    }
      const id = Date.now().toString();
      let messageSend : ChatMessage ={
        messageId : id,
        userId: this.userId,
        username: this.userName,
        userImgUrl: this.userImgUrl,
        toUserId: this.chatUserId,
        time: Date.now(),
        message: this.editorMessage,
        status: 'pending'
      }
      this.messageList.push(messageSend);
      this.scrollToBottom();
      
      this.editorMessage ='';
      if(!this.isOpenEmojiPicker){
        this.messageInput.setFocus();
      }

      this.chatService.sendMessage(messageSend)
      .then(()=>{
        let index  = this.getMessageIndex(id);
        if(index!==-1){
          this.messageList[index].status = 'success';
        }
      })
    
  }

  getMessageIndex(id:string){
    return this.messageList.findIndex(e=>e.messageId===id);
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
