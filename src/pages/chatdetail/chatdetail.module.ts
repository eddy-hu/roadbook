import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatDetailPage } from './chatdetail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChatDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatDetailPage),
    ComponentsModule,
  ],
})
export class ChatDetailPageModule {}
