/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

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
      <a [routerLink]="['./appointments']" (click)="sidenav.close()" md-list-item>
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
    <button md-icon-button (click)="sidenav.open()">
      <md-icon>menu</md-icon>
    </button>
    Medical Appointment Scheduling
  </md-toolbar>
  <main>
    <router-outlet></router-outlet>
  </main>

  <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
</md-sidenav-layout>
  `
})

export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
