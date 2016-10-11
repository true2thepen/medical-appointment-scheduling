import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../app.service';

import { Appointment }           from '../api/model/appointment';
import { AppointmentService }    from '../api/api/appointment.service';
import { Examination }           from '../api/model/examination';
import { ExaminationService }    from '../api/api/examination.service';
import { Patient }               from '../api/model/patient';
import { PatientService }        from '../api/api/patient.service';
import { Room }                  from '../api/model/room';
import { RoomService }           from '../api/api/room.service';

import * as moment from 'moment';

@Component({
  template: require('./appointment-attendance.html'),
  styles: [ require('./appointment-attendance.style.scss') ]
})

export class AppointmentAttendanceComponent {

  private editing: boolean = false;
  private rooms: Room[] = undefined;
  private apppointmentsScheduled: Appointment[] = [];
  private apppointmentsCheckedIn: Appointment[] = [];
  private apppointmentsUnderTreatment: Appointment[] = [];
  private apppointmentsFinished: Appointment[] = [];

  constructor(
    private _state: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private examinationService: ExaminationService,
    private roomService: RoomService,
    private patientService: PatientService) {}

  ngOnInit(): void {
    let param: string = this.route.snapshot.params['id'];

    // This is a sub-page
    this._state.isSubPage.next(false);
    this._state.title.next('Attendance List');

    this.getTodaysAppointments();
  }

  private getTodaysAppointments(): void {
    let start = moment.utc().startOf('day');
    let end = moment.utc().endOf('day');
    this.appointmentService
    //.appointmentFind(`{"where": {"start":  {"between": ["${start.format()}", "${end.format()}"]}}}`)
    .appointmentFind(`{"where": {"start":  {"between": ["2016-08-14", "2016-08-16"]}}}`)
    .subscribe(
      x => this.apppointmentsScheduled = x,
      e => console.log(e),
      () => console.log('Get today\'s appointments complete')
    );
  }

  private checkIn(appointment: Appointment): void {
    let index = this.apppointmentsScheduled.indexOf(appointment);
    if (index > -1) {
      this.apppointmentsScheduled.splice(index, 1);
    }
    this.apppointmentsCheckedIn.push(appointment);
  }
}
