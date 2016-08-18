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
    <button md-icon-button (click)="sidenav.open()">
      <md-icon>menu</md-icon>
    </button>
    {{title}}
  </md-toolbar>
  <main>
    <router-outlet></router-outlet>
  </main>

  <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
</md-sidenav-layout>
  `
})

export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  title = 'Medical Appointment Scheduling';

  constructor(public appState: AppState) {}

  ngOnInit() {
    this.appState.title.subscribe(
      title => this.title = title,
      error => {
        this.title = 'Medical Appointment Scheduling';
        console.log('Error getting title for activated route.');
      },
      () => console.log('Finished retrieving titles for activated route.')
    );
    console.log('Initial App State', this.appState.state);
  }

}
