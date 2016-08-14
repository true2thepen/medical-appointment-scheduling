import { NgModule }                     from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { CommonModule }                 from '@angular/common';
import { MdTabsModule }                 from '@angular2-material/tabs/tabs';
import { MdCardModule }                 from '@angular2-material/card/card';

import { Appointment }                  from '../api/model/Appointment';
import { AppointmentApi }               from '../api/api/AppointmentApi';
import { Examination }                  from '../api/model/Examination';
import { ExaminationApi }               from '../api/api/ExaminationApi';
import { Patient }                      from '../api/model/Patient';
import { PatientApi }                   from '../api/api/PatientApi';
import { Room }                         from '../api/model/Room';
import { RoomApi }                      from '../api/api/RoomApi';

import { AppointmentComponent }         from './appointment.component';
import { AppointmentScheduleComponent } from './appointment-schedule.component';
import { AppointmentDetailComponent }   from './appointment-detail.component';
import { appointmentRouting }           from './appointment.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    appointmentRouting,
    MdTabsModule,
    MdCardModule
  ],
  declarations: [
    AppointmentComponent,
    AppointmentScheduleComponent,
    AppointmentDetailComponent
  ],
  providers: [
    AppointmentApi,
    ExaminationApi,
    PatientApi,
    RoomApi
  ]
})
export class AppointmentModule {}
