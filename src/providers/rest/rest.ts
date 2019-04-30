import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/*
  Generated class for the RestProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  constructor(public http: Http) {
    //console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = "https://imoocqa.gugujiankong.com/api/feeds/get";

  //account
  private apiUrlRegister =
    "https://imoocqa.gugujiankong.com/api/account/register";
  private apiUrlLogin = "https://imoocqa.gugujiankong.com/api/account/login";
  private apiUrlLoginWithMd5 =
    "https://imoocqa.gugujiankong.com/api/account/loginwithmd5";
  private apiUrlUserInfo =
    "https://imoocqa.gugujiankong.com/api/account/userinfo";
  private apiUrlUpdateNickName =
    "https://imoocqa.gugujiankong.com/api/account/updatenickname";
  //question
  private apiUrlQuestionSave =
    "https://imoocqa.gugujiankong.com/api/question/save";
  private apiUrlQuestionList =
    "https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10";
  private apiUrlGetQuestion =
    "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser =
    "https://imoocqa.gugujiankong.com/api/question/getwithuser";

  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";

  private apiUrlSaveFavourite =
    "https://imoocqa.gugujiankong.com/api/question/savefavourite";

  /**
   *
   *
   * @param {any} mobile
   * @param {any} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  login(mobile, password): Observable<string[]> {
    return this.getUrlReturn(
      this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password
    );
  }
  /**
   *
   * @param mobile
   * @param nickname
   * @param password
   */
  register(mobile, nickname, password): Observable<string[]> {
    return this.getUrlReturn(
      this.apiUrlRegister +
        "?mobile=" +
        mobile +
        "&nickname=" +
        nickname +
        "&password=" +
        password
    );
  }

  /**
   *
   *
   * @param {any} mobile
   * @param {any} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  loginWithMd5(mobile, password): Observable<string[]> {
    return this.getUrlReturn(
      this.apiUrlLoginWithMd5 + "?mobile=" + mobile + "&password=" + password
    );
  }

  getUserInfo(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId);
  }

  updateNickName(userId, nickname): Observable<string[]> {
    return this.getUrlReturn(
      this.apiUrlUpdateNickName + "?userid=" + userId + "&nickname=" + nickname
    );
  }

  saveQuestion(userId, title, content): Observable<string[]> {
    return this.getUrlReturn(
      this.apiUrlQuestionSave +
        "?userid=" +
        userId +
        "&title=" +
        title +
        "&content=" +
        content
    );
  }

  getFeeds(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlFeeds);
  }

  /**
   * get detail of the question
   * @param id
   */
  getQuestion(id): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestion + "?id=" + id);
  }

  getQuestionWithUser(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(
      this.apiUrlGetQuestionWithUser + "?id=" + questionId + "&userid=" + userId
    );
  }

  saveFavourite(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(
      this.apiUrlSaveFavourite +
        "?questionid=" +
        questionId +
        "&userid=" +
        userId
    );
  }

  answer(userId, questionId, content): Observable<string[]> {
    return this.getUrlReturn(
      this.apiUrlAnswer +
        "?userid=" +
        userId +
        "&questionid=" +
        questionId +
        "&content=" +
        content
    );
  }

  getQuestions(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionList);
  }

  /**
   *
   * @Parry
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http
      .get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * return json result
   *
   * @private
   * @param {Response} res
   * @returns
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    let body = res.json();
    return JSON.parse(body) || {};
  }

  /**
   * exception handle
   *
   * @private
   * @param {(Response | any)} error
   * @returns
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || "";
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
