import { NgModule } from '@angular/core';
import { EmojipickerComponent } from './emojipicker/emojipicker';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [EmojipickerComponent],
	imports: [IonicModule],
	exports: [EmojipickerComponent]
})
export class ComponentsModule {}
