import { Component, OnInit }  from '@angular/core';
import { ViewChild }          from '@angular/core';
import { Router }             from '@angular/router';
import { AppState }           from '../app.service';

import { ViewAppointment }    from './appointment.viewmodel';
import { Appointment }        from '../api/model/appointment';
import { ViewAppointmentService } from './appointment.service';
import { PatientService }     from '../api/api/patient.service';

import * as moment            from 'moment';

import { Schedule }           from 'primeng/primeng';


@Component({
  templateUrl: './appointment-schedule.html',
  styleUrls: [ './appointment-schedule.style.scss' ]
})

export class AppointmentScheduleComponent implements OnInit {

  private appointments: ViewAppointment[];
  private locale: string;
  private hiddenDays: number[];
  private viewDate: moment.Moment;
  @ViewChild(Schedule) private schedule: Schedule;

  constructor(
    private _state: AppState,
    private router: Router,
    private viewAppointmentService: ViewAppointmentService,
    private patientService: PatientService) {}

  ngOnInit() {
    this.viewDate = moment();
    this._state.isSubPage.next(false);
    this._state.title.next(this.viewDate.format('MMMM YYYY'));
    this._state.actions.next([
      {
        icon: 'keyboard_arrow_left',
        clickHandler: this.handlePrevClick.bind(this)
      },
      {
        icon: 'today',
        clickHandler: this.handleTodayClick.bind(this)
      },
      {
        icon: 'keyboard_arrow_right',
        clickHandler: this.handleNextClick.bind(this)
      }
    ]);
    this._state.primaryAction.next({
      icon: 'add',
      routerLink: 'appointment/add'
    });
    this.getAllAppointments();
    this.locale = localStorage.getItem('locale').startsWith('de') ? 'de' : 'en';
    this.hiddenDays = [ 0 ]; // Hide Sundays by default
  }

  private getAllAppointments(): void {
    this.viewAppointmentService
    .appointmentFind()
    .subscribe(
      x => this.appointments = x,
      e => console.log(e),
      () => console.log('Get all appointments complete')
    );
  }

  private eventDataTransform(eventData) {
    eventData.title = eventData.patientId;
  }

  private handleEventClick(event) {
    this.router.navigate(['appointment', event.calEvent.id]);
  }

  private handleNextClick() {
    this.viewDate = this.viewDate.add(1, 'month');
    this._state.title.next(this.viewDate.format('MMMM YYYY'));
    this.schedule.gotoDate(this.viewDate);
  }

  private handleTodayClick() {
    this.viewDate = moment();
    this._state.title.next(this.viewDate.format('MMMM YYYY'));
    this.schedule.gotoDate(this.viewDate);
  }

  private handlePrevClick() {
    this.viewDate = this.viewDate.subtract(1, 'month');
    this._state.title.next(this.viewDate.format('MMMM YYYY'));
    this.schedule.gotoDate(this.viewDate);
  }
}
