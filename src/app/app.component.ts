/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation }   from '@angular/core';
import { ViewContainerRef }               from '@angular/core';
import { Location }                       from '@angular/common';
import { MdSnackBar, MdSnackBarConfig }   from '@angular/material';
import { MdSnackBarRef }                  from '@angular/material';
import { MdDialogRef, MdDialog,
 MdDialogConfig }                         from '@angular/material';
import { Router }                         from '@angular/router';

import { Subscription }                   from 'rxjs/Subscription';

import { AppState, Action }               from './app.service';
import { ExaminationService }             from './api/api/examination.service';
import { AttendanceService }              from './api/api/attendance.service';
import { AppointmentService }             from './api/api/appointment.service';
import { PatientService }                 from './api/api/patient.service';
import { RoomService }                    from './api/api/room.service';
import { CantyCTIService,
  IncomingCallState }                     from './cantyCti.service';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./app.style.scss') ],
  template: `
<md-sidenav-layout fullscreen>
  <md-sidenav #sidenav>
    <md-nav-list>
      <a [routerLink]="['./appointment/attendance']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>people</md-icon>
        <span md-line>Attendance List</span>
      </a>
      <a [routerLink]="['./appointment']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>view_module</md-icon>
        <span md-line>Month</span>
      </a>
      <a [routerLink]="['./appointment/week']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>view_week</md-icon>
        <span md-line>Week</span>
      </a>
      <a [routerLink]="['./appointment/today']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>view_day</md-icon>
        <span md-line>Today</span>
      </a>
      <a [routerLink]="['./appointment/rooms']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>view_list</md-icon>
        <span md-line>Rooms</span>
      </a>
      <a [routerLink]="['./appointment/statistics']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>show_chart</md-icon>
        <span md-line>Statistics</span>
      </a>
      <a [routerLink]="['./about']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>help</md-icon>
        <span md-line>Help</span>
      </a>
      <md-divider></md-divider>
      <a [routerLink]="['./appointment/anon']" (click)="sidenav.close()" md-list-item>
        <md-icon md-list-icon>visibility_off</md-icon>
        <span md-line>Anonymized View</span>
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
    <span class="md-toolbar-fill-remaining-space"></span>

    <button *ngFor="let action of actions" md-icon-button (click)="actionsHandler(action)">
        <md-icon class="md-24">{{action.icon}}</md-icon>
    </button>

    <button md-icon-button [md-menu-trigger-for]="menu">
       <md-icon>more_vert</md-icon>
    </button>

    <md-menu x-position="before" #menu="mdMenu">
        <button md-menu-item (click)="insertTestExaminations()">Insert Test-Examinations</button>
        <button md-menu-item (click)="insertTestRooms()">Insert Test-Rooms</button>
        <button md-menu-item (click)="insertTestPatients()">Insert Test-Patients</button>
        <md-divider></md-divider>
        <button md-menu-item (click)="createRandomAppointments()">
          Create random appointments
        </button>
        <button md-menu-item (click)="createRandomAttendances()">Create random attendances</button>
        <md-divider></md-divider>
        <button md-menu-item (click)="deleteAllAppointments()">Delete All Appointments</button>
        <button md-menu-item (click)="deleteAllAttendances()">Delete All Attendances</button>
        <button md-menu-item (click)="deleteAllRooms()">Delete All Rooms</button>
        <button md-menu-item (click)="deleteAllPatients()">Delete All Patients</button>
        <button md-menu-item (click)="deleteAllExaminations()">Delete All Examinations</button>
    </md-menu>
  </md-toolbar>
  <main>
    <router-outlet></router-outlet>
  </main>
</md-sidenav-layout>

<button *ngIf="primaryAction"
        md-fab class="right-lower-corner-fab"
        (click)="actionsHandler(primaryAction)"
        [routerLink]="primaryAction.routerLink">
    <md-icon class="md-24">{{primaryAction.icon}}</md-icon>
</button>
  `
})

export class AppComponent {

  public url = 'https://twitter.com/AngularClass';

  private angularclassLogo = 'assets/img/angularclass-avatar.png';
  private name = 'Angular 2 Webpack Starter';
  private title = 'Medical Appointment Scheduling';
  private isSubPage = false;
  private actions: Action[];
  private primaryAction: Action;
  private snackBarConfig: MdSnackBarConfig;
  private snackBarRef: any;
  private snackBarDismissSubscription: Subscription;

  constructor(
    private _state: AppState,
    private _location: Location,
    private router: Router,
    private attendanceService: AttendanceService,
    private appointmentService: AppointmentService,
    private examinationService: ExaminationService,
    private patientService: PatientService,
    private roomService: RoomService,
    private cantyCTIService: CantyCTIService,
    private snackBar: MdSnackBar,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this._state.ensureLocale(); // Make sure locale is set
    console.log('Locale is %s', localStorage.getItem('locale'));
    this.snackBarConfig = new MdSnackBarConfig(this.viewContainerRef);

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

    // Listen for toolbar action changes
    this._state.actions.subscribe(
      actions => this.actions = actions,
      error => {
        this.actions = undefined;
        console.log('Error getting actions for activated route.');
      },
      () => console.log('Finished retrieving actions for activated route.')
    );

    // Listen for toolbar action changes
    this._state.primaryAction.subscribe(
      primaryAction => this.primaryAction = primaryAction,
      error => {
        this.primaryAction = undefined;
        console.log('Error getting primary action for activated route.');
      },
      () => console.log('Finished retrieving primary action for activated route.')
    );

    // Listen for CantyCTI events
    this.cantyCTIService.incomingCall.subscribe(
      incomingCall => {
        if (incomingCall.callState === IncomingCallState.RINGING) {
          const filter = {
            where: {
              phone: incomingCall.phoneNumber
            }
          };
          this.patientService.patientFindOne(JSON.stringify(filter))
          .subscribe(
            patient => {
              this.snackBarRef = this.snackBar.open(
                `Incoming call from ${patient.givenName} ${patient.surname}`,
                'Open',
                this.snackBarConfig
              );
              this.snackBarDismissSubscription = this.snackBarRef.afterDismissed()
              .subscribe(
                null,
                null,
                () => this.router.navigate(['appointment', 'patient', patient.id])
              );
            },
            err => {
              this.snackBar.open(
                `Incoming call from ${incomingCall.phoneNumber}`,
                'OK',
                this.snackBarConfig);
              console.log(err);
            }
          );
        } else if (incomingCall.callState === IncomingCallState.OFFHOOK) {
          // Nothing to do here, just keep displaying the snack bar
        } else { // Hang up, IDLE
          this.snackBarDismissSubscription.unsubscribe();
          this.snackBarRef.dismiss(); // No probleme here if already dismissed
          this.snackBarDismissSubscription = null;
          this.snackBarRef = null;
        }
      },
      err => console.log(err),
      () => console.log('CantyCTI has finished broadcasting incoming calls.')
    );

    // TODO debug output app state on console
    console.log('Initial App State', this._state.state);
  }

  public actionsHandler(action: Action) {
    if (action) {
      if (action.clickHandler) {
        action.clickHandler();
      }
    }
  }

  public deleteAllRooms() {
    this.roomService.roomDeleteAllRooms()
    .subscribe(
      x => console.log(`Deleted all ${x.deletedCount} rooms.`),
      err => console.log(err),
      () => {}
    );
  }

  public deleteAllAppointments() {
    this.appointmentService.appointmentDeleteAllAppointments()
    .subscribe(
      x => console.log(`Deleted all ${x.deletedCount} appointments.`),
      err => console.log(err),
      () => {}
    );
  }

  public deleteAllExaminations() {
    this.examinationService.examinationDeleteAllExaminations()
    .subscribe(
      x => console.log(`Deleted all ${x.deletedCount} examinations.`),
      err => console.log(err),
      () => {}
    );
  }

  public deleteAllAttendances() {
    this.attendanceService.attendanceDeleteAllAttendances()
    .subscribe(
      x => console.log(`Deleted all ${x.deletedCount} attendances.`),
      err => console.log(err),
      () => {}
    );
  }

  public deleteAllPatients() {
    this.patientService.patientDeleteAllPatients()
    .subscribe(
      x => console.log(`Deleted all ${x.deletedCount} patients.`),
      err => console.log(err),
      () => {}
    );
  }

  public insertTestPatients() {
    this.patientService.patientInsertTestData(localStorage.getItem('locale'))
    .subscribe(
      x => console.log(`Inserted ${x.insertCount} test entries for patients.`),
      err => console.log(err),
      () => {}
    );
  }

  public insertTestExaminations() {
    this.examinationService.examinationInsertTestData(localStorage.getItem('locale'))
    .subscribe(
      x => console.log(`Inserted ${x.insertCount} test entries for examinations.`),
      err => console.log(err),
      () => {}
    );
  }

  public insertTestRooms() {
    this.roomService.roomInsertTestData(localStorage.getItem('locale'))
    .subscribe(
      x => console.log(`Inserted ${x.insertCount} test entries for rooms.`),
      err => console.log(err),
      () => {}
    );
  }

  public createRandomAppointments() {
    this.appointmentService.appointmentGenerateRandomAppointments()
    .subscribe(
      x => console.log(`Created random appointments.`),
      err => console.log(err),
      () => {}
    );
  }

  public createRandomAttendances() {
    this.attendanceService.attendanceGenerateRandomAttendances()
    .subscribe(
      x => console.log(`Created random attendances.`),
      err => console.log(err),
      () => {}
    );
  }
}
