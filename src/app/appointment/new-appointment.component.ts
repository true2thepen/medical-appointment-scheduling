import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Appointment } from '../api/model/Appointment';
import { AppointmentApi } from '../api/api/AppointmentApi';

@Component({
  selector: 'new-appointment-form',
  directives: [FORM_DIRECTIVES],
  providers: [AppointmentApi],
  template: require('./new-appointment.html')
})

export class AppointmentForm {
  private newAppointmentForm: ControlGroup;
  private newAppointment: Appointment = {title: 'Julia Berger', description: 'Nothing yet.', createdBy: 123, modifiedBy: 123};

  constructor(private fb: FormBuilder, private appointmentApi: AppointmentApi) {
    this.newAppointmentForm = fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  onSubmit(value: any) : void {
    // Audit
    this.newAppointment.created = new Date();
    this.newAppointment.modified = new Date();
    this.newAppointment.modifiedBy = 0;
    this.newAppointment.createdBy = 0;


    this.appointmentApi
    .appointmentCreate(this.newAppointment)
    .subscribe(
      function(x) { console.log('onNext: %o', x); },
      function(e) { console.log('onError: %o', e); },
      function() { console.log('onCompleted'); }
    );
  }
}
