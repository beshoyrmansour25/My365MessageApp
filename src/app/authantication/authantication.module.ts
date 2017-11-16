import { FormsModule } from '@angular/forms';
import { AuthanticationService } from './authantication.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthanticationRoutingModule } from './authantication-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    SharedModule,
    AuthanticationRoutingModule,
    HttpModule, FormsModule
  ],
  providers: [AuthanticationService],
  declarations: [LoginComponent, SignupComponent]
})
export class AuthanticationModule { }
