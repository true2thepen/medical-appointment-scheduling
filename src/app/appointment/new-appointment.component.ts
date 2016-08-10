import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Appointment, AppointmentApi, Room, RoomApi } from '../api';
import * as moment from 'moment';

@Component({
  selector: 'new-appointment-form',
  providers: [AppointmentApi, RoomApi],
  template: require('./new-appointment.html'),
  styles: [ require('./new-appointment.style.scss') ]
})

export class AppointmentForm {

  private rooms: Room[] = undefined;
  private model = {
    title: undefined,
    description: undefined,
    date: undefined,
    time: undefined,
    duration: undefined,
    room: undefined,
    patient: undefined
  };

  constructor(private appointmentApi: AppointmentApi, private roomApi: RoomApi) {}

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
      patientId: this.model.patient,
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
      () => console.log('Get all rooms complete')
    );
  }
}
