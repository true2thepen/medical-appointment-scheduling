import { Component, OnInit }  from '@angular/core';
import { ViewChildren }       from '@angular/core';
import { QueryList }          from '@angular/core';
import { Router }             from '@angular/router';
import { AppState }           from '../app.service';

import { Appointment }        from '../api/model/appointment';
import { AppointmentService } from '../api/api/appointment.service';
import { Room }               from '../api/model/room';
import { RoomService }        from '../api/api/room.service';

import * as moment            from 'moment';

import { Schedule }           from 'primeng/primeng';

@Component({
  template: require('./appointment-rooms.html'),
  styles: [ require('./appointment-rooms.style.scss') ]
})

export class AppointmentRoomsComponent implements OnInit {

  private appointmentsByRoom: Appointment[][] = [[]];
  private rooms: Room[];
  private locale: any;
  private viewDate: moment.Moment;
  @ViewChildren(Schedule) private schedules: QueryList<Schedule>;

  constructor(
    private _state: AppState,
    private router: Router,
    private appointmentService: AppointmentService,
    private roomService: RoomService) {}

  ngOnInit() {
    this._state.isSubPage.next(false);
    this._state.title.next('Appointments by Room');
    this.getAllRooms();
    this.locale = 'de';
    this.viewDate = moment();
  }

  private getAppointmentsByRoom(room: Room): void {
    this.appointmentService
    .appointmentFind(`{"where": {"roomId": "${room.id}"}}`)
    .subscribe(
      x => this.appointmentsByRoom[room.id] = x,
      e => console.log(e),
      () => console.log(`Get all appointments for room ${room.name} complete`)
    );
  }

  private getAllRooms(): void {
    this.roomService
    .roomFind()
    .subscribe(
      x =>  {
        this.rooms = x;
        for (let room of x) {
          this.getAppointmentsByRoom(room);
        }
      },
      e => console.log(e),
      () => console.log('Get all rooms complete')
    );
  }

  private handleEventClick(event) {
    this.router.navigate(['appointment', event.calEvent.id]);
  }

  private handleNextClick() {
    this.viewDate = this.viewDate.add(1, 'day');
    this.schedules.forEach((x) => { x.gotoDate(this.viewDate); });
  }

  private handlePrevClick() {
    this.viewDate = this.viewDate.subtract(1, 'day');
    this.schedules.forEach((x) => { x.gotoDate(this.viewDate); });
  }
}
