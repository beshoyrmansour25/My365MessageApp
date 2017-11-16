import { AuthanticationService } from './../authantication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signtext = 'Sign <strong>In</strong>';
  loginflag = false;
  constructor(
    private router: Router,
    private authService: AuthanticationService
  ) {
    if (!localStorage.getItem('email')) {
      this.loginflag = true;
    }
  }

  ngOnInit() {
  }
  onSigninAsSender(form: NgForm) {
    this.signtext = 'Signing <strong>In</strong> ....';
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password);
  }
  onSigninAsReceiver(form: NgForm) {
    this.authService.PassCodeChker(form.value.passcode).then(
      () => {
        const passcode = form.value.passcode;
        this.router.navigate(['/messages', passcode]);
      }, () => {
        alert('invaid passCode');
      }
    );
  }

  gotoSignUp() {
    this.router.navigate(['auth/signup']);
  }
  logout() {
    this.authService.logout();
    this.loginflag = true;
  }
  gotoMessageControl() {
    this.router.navigate(['messages/control']);
  }
}
