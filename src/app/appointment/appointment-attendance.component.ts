import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../app.service';

import { CantyCTIService }       from '../cantyCti.service';

import { Appointment }           from '../api/model/appointment';
import { Attendance }            from '../api/model/attendance';
import { AppointmentService }    from '../api/api/appointment.service';
import { Examination }           from '../api/model/examination';
import { Patient }               from '../api/model/patient';
import { Room }                  from '../api/model/room';

import * as moment from 'moment';

@Component({
  templateUrl: './appointment-attendance.html',
  styleUrls: ['./appointment-attendance.style.scss' ]
})

export class AppointmentAttendanceComponent {

  private editing: boolean = false;
  private rooms: Room[] = undefined;
  private allAppointments: any[] = []; // TODO Fix any ViewAppointment
  private appointmentsScheduled: Appointment[] = [];
  private appointmentsCheckedIn: Appointment[] = [];
  private appointmentsUnderTreatment: Appointment[] = [];
  private appointmentsFinished: Appointment[] = [];

  constructor(
    private _state: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private cantyCTIService: CantyCTIService) {}

  ngOnInit(): void {
    // Mouseflow integration
    _mfq.push(['newPageView', '/appointment/attendance']);
    let param: string = this.route.snapshot.params['id'];
    this._state.isSubPage.next(false);
    this._state.title.next(
      localStorage.getItem('locale').startsWith('de') ? 'Anwesenheit' : 'Attendance List');
    this._state.actions.next();
    this._state.primaryAction.next({
      icon: 'person_add',
      routerLink: 'appointment/walk-in-check-in'
    });
    this.getTodaysAppointments();
  }

  private getTodaysAppointments(): void {
    let start = moment.utc().startOf('day');
    let end = moment.utc().endOf('day');
    this.appointmentService
    .appointmentFind(
      `{"where": {"start":  {"between": ["${start.format()}", "${end.format()}"]}}}`
    )
    .subscribe(
      x => {
        this.allAppointments = x;
        for (let i = 0; i < this.allAppointments.length; i++) {

          // Check if an attendance exists for this appointment
          this.appointmentService
          .appointmentPrototypeGetAttendance(this.allAppointments[i].id.toString())
          .subscribe(
            attendance => {
              // Store attendance with appointment for later use
              this.allAppointments[i].attendance = attendance;

              // Patient has already attended. Check state:
              if (attendance.finished) {
                this.appointmentsFinished.push(this.allAppointments[i]);
              } else if (attendance.underTreatment) {
                this.appointmentsUnderTreatment.push(this.allAppointments[i]);
              } else if (attendance.checkedIn) {
                this.appointmentsCheckedIn.push(this.allAppointments[i]);
              }
            },
            e => {
              if (e._body.error.statusCode === 404 && e._body.error.code === 'MODEL_NOT_FOUND') {
                this.appointmentsScheduled.push(this.allAppointments[i]);
                console.log('No attendance yet for this appointment.');
              } else {
                console.log(e);
              }
            },
            () => console.log('Get attendance completed.')
          );

          // Resolve patient name
          this.appointmentService
          .appointmentPrototypeGetPatient(this.allAppointments[i].id.toString())
          .subscribe(
            patient => this.allAppointments[i].patient = patient,
            e => console.log(e),
            () => console.log('Get patient completed.')
          );

          // Resolve examinations
          this.appointmentService
          .appointmentPrototypeGetExaminations(this.allAppointments[i].id.toString())
          .subscribe(
            examinations => this.allAppointments[i].examinations = examinations,
            e => console.log(e),
            () => console.log('Get examinations completed.')
          );

        }
      },
      e => console.log(e),
      () => console.log('Get today\'s appointments completed.')
    );
  }

  private checkIn(appointment: any): void { // TODO Fix any ViewAppointment
    // Prepare data
    let data: Attendance = {
      checkedIn: new Date()
    };

    // TODO check if this patient is already checked in, and allow/deny
    // this operation. Maybe we want to allow this, but in that case, we
    // would have to set checkedIn = underTreatment = new Date().

    this.appointmentService
    .appointmentPrototypeCreateAttendance(appointment.id.toString(), data)
    .subscribe(
      x => appointment.attendance = x,
      e => console.log(e),
      () => {
        console.log('Written attendance successfully.');
        let index = this.appointmentsScheduled.indexOf(appointment);
        if (index > -1) {
          this.appointmentsScheduled.splice(index, 1);
        }
        this.appointmentsCheckedIn.push(appointment);
      }
    );
  }

  private underTreatment(appointment: any): void { // TODO Fix any ViewAppointment
    // Prepare data
    let data: Attendance = {
      underTreatment: new Date()
    };

    // TODO check if this patient is already checked in, and allow/deny
    // this operation. Maybe we want to allow this, but in that case, we
    // would have to set checkedIn = underTreatment = new Date().

    this.appointmentService
    .appointmentPrototypeUpdateAttendance(appointment.id.toString(), data)
    .subscribe(
      x => appointment.attendance = x,
      e => console.log(e),
      () => {
        console.log('Updated attendance successfully.');
        let index = this.appointmentsCheckedIn.indexOf(appointment);
        if (index > -1) {
          this.appointmentsCheckedIn.splice(index, 1);
        }
        this.appointmentsUnderTreatment.push(appointment);
      }
    );
  }

  private checkOut(appointment: any): void { // TODO Fix any ViewAppointment
    // Prepare data
    let data: Attendance = {
      finished: new Date()
    };

    // TODO check if this patient is already checked in, and allow/deny
    // this operation. Maybe we want to allow this, but in that case, we
    // would have to set checkedIn = underTreatment = new Date().

    this.appointmentService
    .appointmentPrototypeUpdateAttendance(appointment.id.toString(), data)
    .subscribe(
      x => appointment.attendance = x,
      e => console.log(e),
      () => {
        console.log('Updated attendance successfully.');
        let index = this.appointmentsUnderTreatment.indexOf(appointment);
        if (index > -1) {
          this.appointmentsUnderTreatment.splice(index, 1);
        }
        this.appointmentsFinished.push(appointment);
      }
    );
  }

  private requestCall(phoneNumber: String) {
    this.cantyCTIService.requestCall(phoneNumber);
  }
}
