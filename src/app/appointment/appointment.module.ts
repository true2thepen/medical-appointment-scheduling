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

import { AppointmentComponent }           from './appointment.component';
import { AppointmentScheduleComponent }   from './appointment-schedule.component';
import { AppointmentDetailComponent }     from './appointment-detail.component';
import { AppointmentRoomsComponent }      from './appointment-rooms.component';
import { AppointmentTodayComponent }      from './appointment-today.component';
import { AppointmentAttendanceComponent } from './appointment-attendance.component';
import { WeekComponent }                  from './week.component';
import { WalkInCheckInComponent }         from './walk-in-check-in.component';
import { AnonComponent }                  from './anon.component';
import { AppointmentRoutingModule }       from './appointment-routing.module';
import { ViewAppointmentService }         from './appointment.service';
import { StatisticsComponent }            from './statistics.component';
import { PatientComponent }               from './patient.component';
import { AcceptOfferComponent }           from './accept-offer.component';
import { PatientCancelAppointmentDialog } from './patient-cancel-appointment.dialog';
import { ClockPickerComponent }           from './clockpicker/clockpicker.component';
import { DatePickerComponent }            from './datepicker/datepicker.component';
import { CantyCTIService }                from '../cantyCti.service';
import { FixTimeAgoToForPipe,
  FixTimeAgoToSincePipe }                 from './fix-time-ago.pipe';

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
    PatientCancelAppointmentDialog,
    WeekComponent,
    WalkInCheckInComponent,
    AnonComponent,
    AcceptOfferComponent,
    FixTimeAgoToForPipe,
    FixTimeAgoToSincePipe,
    ClockPickerComponent,
    DatePickerComponent
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
