import { Message } from './../shared/interfaces/message.interface';
import { User } from './../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
// import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { resolve } from 'url';
import { reject } from 'q';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/finally';

@Injectable()
export class AuthanticationService {

  private basePath = '/users';
  users: User[] = null; //  list of objects
  user: User = null; //   single object


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
  }
  isAuthanticated() {
    localStorage.getItem('email');
  }


  signup(senderName: string, username: string,
    email: string, password: string, receiverName: string,
    PassCode: string, startDate: Date) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.db.list('/users').push({
          'senderName': senderName,
          'username': username,
          'email': email,
          'receiverName': receiverName,
          'PassCode': PassCode,
          'startDate': startDate,
          'messages': [
            // { 'content': 'dummy', 'viewDate': 0 },
          ]
        });
        // console.log(response);
        this.login(email, password);
      })
      .catch(
      error => console.log(error)
      );
  }

  login(email: string, password: string) {
    const promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
        response => {
          this.afAuth.auth.currentUser.getToken()
            .then((token: string) => {
              // this.getusers(email);
              localStorage.setItem('token', token);
              localStorage.setItem('email', email);
              resolve();
            }
            );
        }
      )
        .catch(
        error => {
          alert('there is a problem !: ' + error.message);
          console.log(error);
          reject();
        }
        );
    });
    return promise;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
    localStorage.clear();
  }
  PassCodeChker(passCode) {
    const promise = new Promise((resolve, reject) => {
      if (passCode) {
        this.db.list('/users', ref => ref.orderByChild('PassCode').equalTo(passCode)).valueChanges()
          .subscribe(response => {
            if (response.length !== 0) {
              resolve();
            } else {
              reject();
            }
          });
      } else { reject(); }
    });
    return promise;
  }

}
