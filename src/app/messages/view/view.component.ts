import { AuthanticationService } from './../../authantication/authantication.service';
import { MessagesService } from './../messages.service';
import { element } from 'protractor';
import { Message } from './../../shared/interfaces/message.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  private user: FirebaseListObservable<any[]>;
  private passCode = '';
  private senderName = '';
  private receiverName = '';
  private todayMessage = null;
  private messages: any[];
  private today = Date.now();
  private snap = '';
  private userMessages: { content: string, viewDate: number }[] = [];
  spinner = false;
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:quotemark
  // todayMessage = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.";
  constructor(
    private activatedRoute: ActivatedRoute,
    private messagesService: MessagesService,
    private authService: AuthanticationService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.passCode = routeParams.passcode;
    });
    this.authService.PassCodeChker(this.passCode).then(
      () => {
        this.spinner = true;
        this.db.database.ref().child('users')
          .orderByChild('PassCode').equalTo(this.passCode)
          .once('child_added', function (snapshot) {
            console.log(snapshot.key);
          }).then(snapshot => {
            this.snap = snapshot.key;
          });

        this.getTodayMessage().subscribe((user: any) => {
          this.user = user[0];
          user[0].messages.map(x => {
            this.userMessages.push({ content: x.content, viewDate: x.viewDate });
          });
          this.senderName = user[0].senderName;
          this.receiverName = user[0].receiverName;
          for (const message in this.userMessages) {
            if (this.userMessages.hasOwnProperty(message)) {
              const element = this.userMessages[message];
              if (moment(element.viewDate).isSame(Date.now(), 'day')) {
                this.todayMessage = element.content;
                break;
              } else {
                if (element.viewDate === 0) {
                  this.todayMessage = element.content;
                  element.viewDate = Date.now();
                  this.changeDate();
                  break;
                }
              }
            }
          }
        });
      }, () => {
        this.spinner = false;
        alert('invaid passCode');
        this.router.navigate(['/']);
      }
    );
  }

  changeDate() {
    this.messagesService.saveData(this.user, this.userMessages, this.snap).then(() => { }, (err) => alert('Error : ' + err));
  }
  getTodayMessage() {
    return this.db.list('/users', ref => ref.orderByChild('PassCode').equalTo(this.passCode)).valueChanges();
  }
}
