import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';

import { Appointment }                  from '../api/model/Appointment';
import { AppointmentApi }               from '../api/api/AppointmentApi';
import { Room }                         from '../api/model/Room';
import { RoomApi }                      from '../api/api/RoomApi';

import { Schedule } from 'primeng/primeng';

@Component({
  template:
  `
<md-tab-group>
  <md-tab>
    <template md-tab-label>All</template>
    <template md-tab-content>
      <md-card>
        <p-schedule [header]="header" [locale]="locale" [events]="appointments"></p-schedule>
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
          [height]="800">
          </p-schedule>
        </md-card-content>
      </md-card>
    </div>
    </template>
  </md-tab>
</md-tab-group>
<ul>
  <li *ngFor="let appointment of appointments">
    {{ appointment.title }}
  </li>
</ul>
<button md-fab routerLink="/new-appointment">
    <md-icon class="md-24">add</md-icon>
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
    private appointmentApi: AppointmentApi,
    private roomApi: RoomApi) {}

  ngOnInit() {
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
    this.appointmentApi
    .appointmentFind()
    .subscribe(
      x => this.appointments = x,
      e => console.log(e),
      () => console.log('Get all appointments complete')
    );
  }

  private getAppointmentsByRoom(room: Room): void {
    this.appointmentApi
    .appointmentFind(`{"where": {"roomId": "${room.id}"}}`)
    .subscribe(
      x => this.appointmentsByRoom[room.id] = x,
      e => console.log(e),
      () => console.log(`Get all appointments for room ${room.name} complete`)
    );
  }

  private getAllRooms(): void {
    this.roomApi
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
}
