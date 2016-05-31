import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Appointment } from '../api/model/Appointment';
import { AppointmentApi } from '../api/api/AppointmentApi';

@Component({
  selector: 'my-item-component',
  providers: [AppointmentApi],
  template:
  `
  IT WORKS!
  <ul>
    <li *ngFor="let appointment of appointments">
      {{ appointment.title }}
    </li>
  </ul>
  `,
  directives: [CORE_DIRECTIVES]
})

export class MyItemComponent implements OnInit {

  private appointments: Appointment[];

  constructor(private appointmentApi: AppointmentApi) { }

  ngOnInit() {
    this.getAllItems();
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
