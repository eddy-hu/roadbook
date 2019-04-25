import { Component } from '@angular/core';

import { DiscoveryPage } from '../discovery/discovery';
import { ChatPage } from '../chat/chat';
import { HomePage } from '../home/home';
import { NotificationPage } from '../notification/notification';
import { MorePage } from '../more/more';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabChat = ChatPage;
  tabNotification = NotificationPage;
  tabMore = MorePage;

  constructor() {

  }
}
