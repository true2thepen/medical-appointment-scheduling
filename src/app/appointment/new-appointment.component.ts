import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { Appointment, AppointmentApi, Room, RoomApi, Patient, PatientApi } from '../api';
import * as moment from 'moment';

@Component({
  directives: [AutoComplete],
  selector: 'new-appointment-form',
  providers: [AppointmentApi, PatientApi, RoomApi],
  template: require('./new-appointment.html'),
  styles: [ require('./new-appointment.style.scss') ]
})

export class AppointmentForm {

  private rooms: Room[] = undefined;
  private patients: Patient[] = undefined;
  private model = {
    title: undefined,
    description: undefined,
    date: undefined,
    time: undefined,
    duration: undefined,
    room: undefined,
    patient: undefined
  };

  constructor(private appointmentApi: AppointmentApi, private roomApi: RoomApi, private patientApi: PatientApi) {}

  ngOnInit(): void {
    this.getAllRooms();
  }

  onSubmit(): void {
    let newAppointment: Appointment  = {
      title: this.model.title,
      description: this.model.description,
      modified: new Date(),
      created: new Date(),
      modifiedBy: 0,
      createdBy: 0,
      patientId: this.model.patient.id,
      roomId: this.model.room
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
  }

  private getAllRooms(): void {
    this.roomApi
    .roomFind()
    .subscribe(
      x => this.rooms = x,
      e => console.log(e),
      () => console.log('Get all rooms complete.')
    );
  }

  private findPatients(event) {
    this.patientApi
    .patientFind(`{"where": {"name": {"regexp": "${event.query}/i"}}}`)
    .subscribe(
      x => this.patients = x,
      e => console.log(e),
      () => console.log('Completed querying for patients.')
    );
  }
}
