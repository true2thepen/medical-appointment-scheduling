import { Component, OnInit }  from '@angular/core';
import { ViewChild }          from '@angular/core';
import { Router }             from '@angular/router';
import { AppState }           from '../app.service';

import { Appointment }        from '../api/model/appointment';
import { AppointmentService } from '../api/api/appointment.service';

@Component({
  template: require('./appointment-schedule.html'),
  styles: [ require('./appointment-schedule.style.scss') ]
})

export class AppointmentScheduleComponent implements OnInit {

  private appointments: Appointment[];
  private appointmentsByRoom: Appointment[][] = [[]];
  private locale: any;

  constructor(
    private _state: AppState,
    private router: Router,
    private appointmentService: AppointmentService) {}

  ngOnInit() {
    this._state.isSubPage.next(false);
    this._state.title.next('Appointments');
    this.getAllAppointments();
    this.locale = 'de';
  }

  private getAllAppointments(): void {
    this.appointmentService
    .appointmentFind()
    .subscribe(
      x => this.appointments = x,
      e => console.log(e),
      () => console.log('Get all appointments complete')
    );
  }

  private handleEventClick(event) {
    this.router.navigate(['appointment', event.calEvent.id]);
  }
}
