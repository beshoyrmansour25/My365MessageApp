import { Message } from './../shared/interfaces/message.interface';
import { AngularFireDatabaseModule, AngularFireDatabase, } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Http, Response } from '@angular/http';

@Injectable()
export class MessagesService {
  messageChanged: any;
  private email = localStorage.getItem('email');
  messages: Observable<Message[]> = null;
  message: Observable<Message> = null;
  mydate: Date;
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  getMessages() {
    if (this.email) {
      this.messages = this.db.list('/users', ref => ref.orderByChild('email').equalTo(this.email)).valueChanges();
      return this.messages;
    }
  }
  saveData(user, userMessages, snap) {
    const promise = new Promise((resolve, reject) => {
        this.db.object('users/' + snap).update({
          'senderName': user.senderName,
          'username': user.username,
          'email': user.email,
          'receiverName': user.receiverName,
          'PassCode': user.PassCode,
          'startDate': user.startDate,
          'messages': userMessages
        }).then(res => {
          resolve();
        }).catch(res => {
          reject();
        });
      });
      return promise;
    }
  }


// Momentjs.com
