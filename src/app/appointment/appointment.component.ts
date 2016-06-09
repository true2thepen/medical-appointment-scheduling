import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Appointment } from '../api/model/Appointment';
import { AppointmentApi } from '../api/api/AppointmentApi';
import { Schedule } from 'primeng/primeng';

@Component({
  selector: 'my-item-component',
  providers: [AppointmentApi],
  template:
  `
  <md-card x-large>IT WORKS!</md-card>
  <p-schedule [header]="header" [locale]="locale" [events]="appointments"></p-schedule>
  <ul>
  <li *ngFor="let appointment of appointments">
  {{ appointment.title }}
  </li>
  </ul>
  `,
  directives: [CORE_DIRECTIVES, Schedule],
  styles: []
})

export class MyItemComponent implements OnInit {

  private appointments: Appointment[];
  private header: any;
  private locale: any;

  constructor(private appointmentApi: AppointmentApi) { }

  ngOnInit() {
    this.getAllItems();
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
    this.locale = {
      lang: 'de'
    };
  }

  private getAllItems(): void {
    this.appointmentApi
    .appointmentFind()
    .subscribe(
      x => this.appointments = x,
      e => console.log(e),
      () => console.log('Get all Items complete')
      );
  }
}
