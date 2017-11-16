import { AuthanticationService } from './../authantication.service';
// import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private AuthService: AuthanticationService
  ) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const senderName = form.value.senderName;
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const receiverName = form.value.receiverName;
    const PassCode = form.value.PassCode;
    const startDate = form.value.startDate;
    this.AuthService.signup(senderName, username, email, password, receiverName, PassCode, startDate);
  }

}


