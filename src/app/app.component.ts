/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Location }                     from '@angular/common';

import { AppState }                     from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
<md-sidenav-layout fullscreen>
  <md-sidenav #sidenav>
    <md-nav-list>
      <a [routerLink]="['./home']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>home</md-icon>
        <span md-line>Home</span>
        <!--<span md-line class="secondary">Take a look at your appointments</span>-->
      </a>
      <a [routerLink]="['./appointment']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>view_week</md-icon>
        <span md-line>Appointments</span>
      </a>
      <a [routerLink]="['./about']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>help</md-icon>
        <span md-line>Help</span>
      </a>
    </md-nav-list>
  </md-sidenav>
  <md-toolbar color="primary">
    <button *ngIf="!isSubPage" md-icon-button (click)="sidenav.open()">
      <md-icon>menu</md-icon>
    </button>
    <button *ngIf="isSubPage" md-icon-button (click)="_location.back()">
      <md-icon>arrow_back</md-icon>
    </button>
    {{title}}
  </md-toolbar>
  <main>
    <router-outlet></router-outlet>
  </main>

  <pre class="app-state">this._state.state = {{ _state.state | json }}</pre>
</md-sidenav-layout>
  `
})

export class AppComponent {

  private angularclassLogo = 'assets/img/angularclass-avatar.png';
  private name = 'Angular 2 Webpack Starter';
  private url = 'https://twitter.com/AngularClass';
  private title = 'Medical Appointment Scheduling';
  private isSubPage = false;

  constructor(private _state: AppState, private _location: Location) {}

  ngOnInit() {

    // Listen for title changes
    this._state.title.subscribe(
      title => this.title = title,
      error => {
        this.title = 'Medical Appointment Scheduling';
        console.log('Error getting title for activated route.');
      },
      () => console.log('Finished retrieving titles for activated route.')
    );

    // Listen for toolbar icon changes
    this._state.isSubPage.subscribe(
      isSubPage => this.isSubPage = isSubPage,
      error => {
        this.isSubPage = false;
        console.log('Error getting isSubPage for activated route.');
      },
      () => console.log('Finished retrieving isSubPage for activated route.')
    );

    // TODO debug output app state on console
    console.log('Initial App State', this._state.state);
  }

}
