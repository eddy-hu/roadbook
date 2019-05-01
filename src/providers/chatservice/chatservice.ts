
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


export class ChatMessage{
  messageId: string;
  userId: string;
  username: string;
  userImgUrl: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;

}

export class UserInfo{
  userId: string;
  userName: string;
  userImgUrl: string;

}



@Injectable()
export class ChatserviceProvider {

  constructor(public http: Http) {
  }

  getMessageList(): Promise<ChatMessage[]>{
     const url = '../../assets/mock/msg-list.json';
     return new Promise<ChatMessage[]>((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          res => {
            resolve(res.json().array);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  

}
