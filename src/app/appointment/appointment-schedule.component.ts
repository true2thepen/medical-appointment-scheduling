import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { AppState }           from '../app.service';

import { Appointment }        from '../api/model/appointment';
import { AppointmentService } from '../api/api/appointment.service';
import { Room }               from '../api/model/room';
import { RoomService }        from '../api/api/room.service';

import { Schedule } from 'primeng/primeng';

@Component({
  template:
  `
<md-tab-group>
  <md-tab>
    <template md-tab-label>All</template>
    <template md-tab-content>
      <md-card>
        <p-schedule [header]="header"
                    [locale]="locale"
                    [events]="appointments"
                    (onEventClick)="handleEventClick($event)">
        </p-schedule>
      </md-card>
    </template>
  </md-tab>
  <md-tab>
    <template md-tab-label>By Room</template>
    <template md-tab-content>
    <div class="appointment-by-room-container">
      <md-card *ngFor="let room of rooms" class="appointment-by-room-card">
        <md-card-title>
          {{room.name}}
        </md-card-title>
        <md-card-content>
          <p-schedule
          header="false"
          defaultView="agendaDay"
          [locale]="locale"
          [events]="appointmentsByRoom[room.id]"
          [height]="800"
          (onEventClick)="handleEventClick($event)">
          </p-schedule>
        </md-card-content>
      </md-card>
    </div>
    </template>
  </md-tab>
</md-tab-group>
<button md-fab routerLink="/appointment/add">
    <md-icon>add</md-icon>
</button>
  `,
  directives: [Schedule],
  styles: [ require('./appointment-schedule.style.scss') ]
})

export class AppointmentScheduleComponent implements OnInit {

  private appointments: Appointment[];
  private appointmentsByRoom: Appointment[][] = [[]];
  private rooms: Room[];
  private header: any;
  private locale: any;

  constructor(
    private _state: AppState,
    private router: Router,
    private appointmentService: AppointmentService,
    private roomService: RoomService) {}

  ngOnInit() {
    this._state.isSubPage.next(false);
    this._state.title.next('Appointments');
    this.getAllAppointments();
    this.getAllRooms();
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.locale = {
      lang: 'de'
    };
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
}
