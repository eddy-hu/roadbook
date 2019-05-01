import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path/ngx";
import { AvatarPageModule } from '../pages/avatar/avatar.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { DiscoveryPageModule } from '../pages/discovery/discovery.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MorePageModule } from '../pages/more/more.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { UserPageModule } from '../pages/user/user.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { QuestionPageModule } from '../pages/question/question.module';
import { QuestionPage } from '../pages/question/question';
import { DetailsPageModule } from '../pages/details/details.module';
import { DetailsPage } from '../pages/details/details';
import { AnswerPageModule } from '../pages/answer/answer.module';
import { AnswerPage } from '../pages/answer/answer';
import { ChatDetailPageModule } from '../pages/chatdetail/chatdetail.module';
import { ChatDetailPage } from '../pages/chatdetail/chatdetail';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ComponentsModule } from '../components/components.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChatserviceProvider } from '../providers/chatservice/chatservice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    AvatarPageModule,
    DiscoveryPageModule,
    ChatPageModule,
    LoginPageModule,
    MorePageModule,
    RegisterPageModule,
    NotificationPageModule,
    UserPageModule,
    QuestionPageModule,
    DetailsPageModule,
    AnswerPageModule,
    HttpModule,
    ChatDetailPageModule,
    ComponentsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    TabsPage,
    RegisterPage,
    UserPage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Camera,
    File,
    Transfer,
    FilePath,
    EmojiProvider,
    ChatserviceProvider,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]


})
export class AppModule {}
