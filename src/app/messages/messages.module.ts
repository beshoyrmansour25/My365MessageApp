import { MessagesService } from './messages.service';
import { AuthanticationService } from './../authantication/authantication.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { MessagesRoutingModule } from './messages-routing.module';
import { ControlComponent } from './control/control.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    SharedModule,
    MessagesRoutingModule,
    HttpModule,
    FormsModule
  ],
  declarations: [ControlComponent, ViewComponent],
  providers: [AuthanticationService, MessagesService]
})
export class MessagesModule { }
