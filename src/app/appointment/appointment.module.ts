import { NgModule }                       from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { ReactiveFormsModule }            from '@angular/forms';
import { CommonModule }                   from '@angular/common';
import { MaterialModule }                 from '@angular/material';

import 'fullcalendar';
import 'fullcalendar/dist/locale-all.js';

import { AutoCompleteModule }             from 'primeng/primeng';
import { ScheduleModule }                 from 'primeng/primeng';
import { MomentModule }                   from 'angular2-moment';
import { Md2Module }                      from 'md2';

import { ApiModule }                      from '../api/api.module';

import { AcceptOfferComponent }                    from './accept-offer.component';
import { AnonComponent }                           from './anon.component';
import { AppointmentAttendanceComponent }          from './attendance.component';
import { AppointmentComponent }                    from './appointment.component';
import { AppointmentDetailComponent }              from './detail.component';
import { AppointmentRoomsComponent }               from './rooms.component';
import { AppointmentRoutingModule }                from './appointment-routing.module';
import { AppointmentScheduleComponent }            from './schedule.component';
import { AppointmentTodayComponent }               from './today.component';
import { CantyCTIService }                         from '../cantyCti.service';
import { FixTimeAgoToForPipe,
  FixTimeAgoToSincePipe }                          from './fix-time-ago.pipe';
import { PatientCancelAppointmentDialogComponent } from './patient-cancel-appointment.dialog';
import { PatientComponent }                        from './patient.component';
import { StatisticsComponent }                     from './statistics.component';
import { ViewAppointmentService }                  from './appointment.service';
import { WalkInCheckInComponent }                  from './walk-in-check-in.component';
import { WeekComponent }                           from './week.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    Md2Module,
    ApiModule,
    AppointmentRoutingModule,
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
    PatientCancelAppointmentDialogComponent,
    WeekComponent,
    WalkInCheckInComponent,
    AnonComponent,
    AcceptOfferComponent,
    FixTimeAgoToForPipe,
    FixTimeAgoToSincePipe
  ],
  providers: [
    ViewAppointmentService,
    CantyCTIService
  ],
  entryComponents: [
    PatientCancelAppointmentDialogComponent
  ]
})
export class AppointmentModule {}
