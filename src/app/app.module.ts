import { NgModule, ErrorHandler } from '@angular/core';
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
import { AvatarPage } from '../pages/avatar/avatar';
import { HttpModule } from '@angular/http'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
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
    AvatarPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    AvatarPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
