import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Appointment, AppointmentApi } from '../api';
import * as moment from 'moment';

@Component({
  selector: 'new-appointment-form',
  providers: [AppointmentApi],
  template: require('./new-appointment.html'),
  styles: [ require('./new-appointment.style.scss') ]
})

export class AppointmentForm {

  private model = {
    title: undefined,
    description: undefined,
    date: undefined,
    time: undefined,
    duration: undefined
  };

  constructor(private appointmentApi: AppointmentApi) {
  }

  onSubmit(): void {
    let newAppointment: Appointment  = {
      title: this.model.title,
      description: this.model.description,
      modified: new Date(),
      created: new Date(),
      modifiedBy: 0,
      createdBy: 0
    };
    let start: moment.Moment = moment(this.model.date + ' ' + this.model.time);
    let end: moment.Moment = start.clone();
    end.add(moment.duration(this.model.duration));
    newAppointment.start = start.toDate();
    newAppointment.end = end.toDate();

    this.appointmentApi
    .appointmentCreate(newAppointment)
    .subscribe(
      function(x) { console.log('onNext: %o', x); },
      function(e) { console.log('onError: %o', e); },
      function() { console.log('onCompleted'); }
    );
  };
}
