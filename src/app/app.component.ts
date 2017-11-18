import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

// import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private _location: Location,
    public router: Router
  ) { }

  ngOnInit() {

  }
  backClicked() {
    this._location.back();
  }
  ngOnDestroy() {
    localStorage.clear();
  }
}
