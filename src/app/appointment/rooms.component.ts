import { Component, OnInit }      from '@angular/core';
import { ViewChildren }           from '@angular/core';
import { QueryList }              from '@angular/core';
import { Router }                 from '@angular/router';

import * as moment                from 'moment';
import { Schedule }               from 'primeng/primeng';

import { AppState }               from '../app.service';
import { Appointment }            from '../api/model/appointment';
import { ViewAppointmentService } from './appointment.service';
import { Room }                   from '../api/model/room';
import { RoomService }            from '../api/api/room.service';

@Component({
  templateUrl: './rooms.component.html',
  styleUrls: [ './rooms.component.scss' ]
})

export class AppointmentRoomsComponent implements OnInit {

  public appointmentsByRoom: Appointment[][] = [[]];
  public rooms: Room[];
  public locale: string;
  public minTime: moment.Duration = moment.duration('07:00:00');
  public maxTime: moment.Duration = moment.duration('20:00:00');
  public viewDate: moment.Moment = moment();

  @ViewChildren(Schedule) private schedules: QueryList<Schedule>;

  constructor(
    private _state: AppState,
    private router: Router,
    private viewAppointmentService: ViewAppointmentService,
    private roomService: RoomService
  ) {}

  public ngOnInit() {
    // Mouseflow integration
    if ((<any> window)._mfq) {
      (<any> window)._mfq.push(['newPageView', '/appointment/rooms']);
    }

    // Set up page
    this._state.isSubPage.next(false);
    this._state.title.next(this.viewDate.format('LL'));
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

    // Retrieve data
    this.getAllRooms();

    // Set up calendar view
    this.locale = localStorage.getItem('locale').startsWith('de') ? 'de' : 'en';
  }

  /**
   * Triggered when a calendar event is clicked.
   */
  public handleEventClick(event) {
    this.router.navigate(['appointment', event.calEvent.id]);
  }

  private getAppointmentsByRoom(room: Room): void {
    this.viewAppointmentService
    .appointmentFind(`{"where": {"roomId": "${room.id}"}}`)
    .subscribe(
      (x) => this.appointmentsByRoom[room.id] = x,
      (e) => console.log(e),
      () => console.log(`Get all appointments for room ${room.name} complete`)
    );
  }

  private getAllRooms(): void {
    this.roomService
    .roomFind()
    .subscribe(
      (x) =>  {
        this.rooms = x;
        for (let room of x) {
          this.getAppointmentsByRoom(room);
        }
      },
      (e) => console.log(e),
      () => console.log('Get all rooms complete')
    );
  }

  private handleNextClick() {
    this.viewDate = this.viewDate.add(1, 'day');
    this._state.title.next(this.viewDate.format('LL'));
    this.schedules.forEach((x) => { x.gotoDate(this.viewDate); });
  }

  private handleTodayClick() {
    this.viewDate = moment();
    this._state.title.next(this.viewDate.format('LL'));
    this.schedules.forEach((x) => { x.gotoDate(this.viewDate); });
  }

  private handlePrevClick() {
    this.viewDate = this.viewDate.subtract(1, 'day');
    this._state.title.next(this.viewDate.format('LL'));
    this.schedules.forEach((x) => { x.gotoDate(this.viewDate); });
  }
}
