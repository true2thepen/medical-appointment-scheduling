/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';
import { MyItemComponent } from './appointment/appointment.component';
import { AppointmentForm } from './appointment/new-appointment.component';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [RouterActive],
  encapsulation: ViewEncapsulation.None,
  styles: [
  ],
  template: `
<md-sidenav-layout fullscreen>
  <md-sidenav #sidenav>
    <md-nav-list>
      <a md-list-item *ngFor="let view of views">
        <md-icon md-list-icon>{{view.icon}}</md-icon>
        <span md-line>{{view.name}}</span>
        <span md-line class="secondary">{{view.description}}</span>
      </a>
    </md-nav-list>
  </md-sidenav>
  <md-toolbar color="primary">
    <button md-icon-button (click)="sidenav.open()">
      <md-icon>menu</md-icon>
    </button>
    Medical Appointment Scheduling
  </md-toolbar>
    <span router-active>
      <button md-raised-button [routerLink]=" ['Index'] ">
        Index
      </button>
    </span>
    <span router-active>
      <button md-raised-button [routerLink]=" ['Home'] ">
        Home
      </button>
    </span>
    <span router-active>
      <button md-raised-button [routerLink]=" ['Appointments'] ">
        Appointments
      </button>
    </span>
    <span router-active>
      <button md-raised-button [routerLink]=" ['About'] ">
        About
      </button>
    </span>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
</md-sidenav-layout>
`
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
  { path: '/appointments', name: 'Appointments', component: MyItemComponent },
  { path: '/new-appointment', name: 'New Appointment', component: AppointmentForm }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState) {

  }

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
