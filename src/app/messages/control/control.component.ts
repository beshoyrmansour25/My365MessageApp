import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User } from './../../shared/interfaces/user.interface';
import { Message } from './../../shared/interfaces/message.interface';
import { MessagesService } from './../messages.service';
import { AuthanticationService } from './../../authantication/authantication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthanticationService,
    private messagesService: MessagesService,
    private formBuilder: FormBuilder
  ) { }
  private msgCounter = 0;
  private senderName = '';
  private userMessages: { content: string, viewDate: number }[] = [];
  private messageForm: FormGroup;
  private user: FirebaseListObservable<User[]>;
  private snap = '';
  private messages: any[] = [{ content: '', viewDate: 0 }];
  spinner = false;
  ngOnInit() {
    this.spinner = false;
    this.messageForm = this.formBuilder.group({
      'messageField': new FormControl('', Validators.required),
      'messages': new FormArray([])
    });
    this.loadData();
  }
  loadData() {
    this.userMessages.splice(0, this.userMessages.length);
    const rootref = this.db.database.ref().child('users').orderByChild('email').equalTo(localStorage.getItem('email'))
      .once('child_added', function (snapshot) {
      }).then(snapshot => {
        this.snap = snapshot.key;
        this.spinner = true;
      });
    this.messagesService.getMessages().subscribe((user: any) => {
      this.user = user[0];
      user[0].messages.map(x => {
        this.userMessages.push({ content: x.content, viewDate: x.viewDate });
      });
      this.msgCounter = this.userMessages.length;
      this.senderName = user[0].senderName;
      localStorage.setItem('PassCode', user[0].PassCode);
      this.messageForm = this.formBuilder.group({
        messageField: '',
        messages: this.userMessages
      });
    });
  }
  private onEditMessage(content: string, index: number) {
    console.log('================== content ==================');
    console.log(content);
    this.userMessages[index].content = content;
    console.log('================== userMessages[index].content ==================');
    console.log(this.userMessages[index].content);
    // this.messagesService.saveData(this.user, this.userMessages, this.snap).then(() => this.loadData(), (err) => alert('Error : ' + err));
  }
  addNewMessage() {
    this.userMessages.push({
      content: this.messageForm.value['messageField'],
      viewDate: 0
    });
    this.messagesService.saveData(this.user, this.userMessages, this.snap).then(() => this.loadData(), (err) => alert('Error : ' + err));
    // setTimeout(() => this.loadData(), 1000);
    // this.loadData();
  }
  onDeleteTask(index: number) {
    this.userMessages.splice(index, 1);
    this.messagesService.saveData(this.user, this.userMessages, this.snap).then(() => this.loadData(), (err) => alert('Error : ' + err));
    this.userMessages.splice(index, this.userMessages.length);
    setTimeout(() => this.loadData(), 1000);
    // this.loadData();
  }
  logout() { this.authService.logout(); }
}
