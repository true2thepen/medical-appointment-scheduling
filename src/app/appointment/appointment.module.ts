import { NgModule }                       from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { CommonModule }                   from '@angular/common';
import { MaterialModule }                 from '@angular/material';

import { AutoCompleteModule }             from 'primeng/primeng';
import { ScheduleModule }                 from 'primeng/primeng';
import { MomentModule }                   from 'angular2-moment';

import { ApiModule }                      from '../api/api.module';

import { AppointmentComponent }           from './appointment.component';
import { AppointmentScheduleComponent }   from './appointment-schedule.component';
import { AppointmentDetailComponent }     from './appointment-detail.component';
import { AppointmentRoomsComponent }      from './appointment-rooms.component';
import { AppointmentTodayComponent }      from './appointment-today.component';
import { AppointmentAttendanceComponent } from './appointment-attendance.component';
import { appointmentRouting }             from './appointment.routing';
import { ViewAppointmentService }         from './appointment.service';
import { StatisticsComponent }            from './statistics.component';
import { PatientComponent }               from './patient.component';
import { PatientCancelAppointmentDialog } from './patient-cancel-appointment.dialog';
import { CantyCTIService }                from '../cantyCti.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ApiModule,
    appointmentRouting,
    AutoCompleteModule,
    ScheduleModule,
    MomentModule
  ],
  declarations: [
    AppointmentComponent,
    AppointmentScheduleComponent,
    AppointmentDetailComponent,
    AppointmentRoomsComponent,
    AppointmentTodayComponent,
    AppointmentAttendanceComponent,
    PatientComponent,
    StatisticsComponent,
    PatientCancelAppointmentDialog
  ],
  providers: [
    ViewAppointmentService,
    CantyCTIService
  ],
  entryComponents: [
    PatientCancelAppointmentDialog
  ]
})
export class AppointmentModule {}
