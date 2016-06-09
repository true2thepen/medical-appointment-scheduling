import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Appointment } from '../api/model/Appointment';
import { AppointmentApi } from '../api/api/AppointmentApi';
import * as moment from 'moment';

@Component({
  selector: 'new-appointment-form',
  directives: [FORM_DIRECTIVES],
  providers: [AppointmentApi],
  template: require('./new-appointment.html')
})

export class AppointmentForm {
  private newAppointmentForm: ControlGroup;

  constructor(private fb: FormBuilder, private appointmentApi: AppointmentApi) {
    this.newAppointmentForm = fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  onSubmit(values: any): void {
    // Build object
    let newAppointment: Appointment = {
      title: values.title,
      description: values.description
    };
    let start: moment.Moment = moment(values.date + ' ' + values.time);
    let end: moment.Moment = start.clone();
    end.add(moment.duration(values.duration));

    newAppointment.start = start.toDate();
    newAppointment.end = end.toDate();
    newAppointment.created = new Date();
    newAppointment.modified = new Date();
    newAppointment.modifiedBy = 0;
    newAppointment.createdBy = 0;
    moment.duration();

    this.appointmentApi
    .appointmentCreate(newAppointment)
    .subscribe(
      function(x) { console.log('onNext: %o', x); },
      function(e) { console.log('onError: %o', e); },
      function() { console.log('onCompleted'); }
    );
  };
}
