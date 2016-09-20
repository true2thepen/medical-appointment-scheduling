import { NgModule }                     from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { CommonModule }                 from '@angular/common';

import { MdTabsModule }                 from '@angular2-material/tabs/tabs';
import { MdCardModule }                 from '@angular2-material/card/card';
import { MdIconModule }                 from '@angular2-material/icon/icon';
import { MdInputModule }                from '@angular2-material/input/input';

import { AutoCompleteModule }           from 'primeng/primeng';
import { ScheduleModule }               from 'primeng/primeng';

import { ApiModule }                    from '../api/api.module';

import { AppointmentComponent }         from './appointment.component';
import { AppointmentScheduleComponent } from './appointment-schedule.component';
import { AppointmentDetailComponent }   from './appointment-detail.component';
import { AppointmentRoomsComponent }    from './appointment-rooms.component';
import { appointmentRouting }           from './appointment.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ApiModule,
    appointmentRouting,
    MdTabsModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    AutoCompleteModule,
    ScheduleModule
  ],
  declarations: [
    AppointmentComponent,
    AppointmentScheduleComponent,
    AppointmentDetailComponent,
    AppointmentRoomsComponent
  ]
})
export class AppointmentModule {}
