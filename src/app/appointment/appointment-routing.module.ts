import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppointmentComponent }           from './appointment.component';
import { AppointmentScheduleComponent }   from './appointment-schedule.component';
import { AppointmentDetailComponent }     from './appointment-detail.component';
import { AppointmentRoomsComponent }      from './appointment-rooms.component';
import { AppointmentTodayComponent }      from './appointment-today.component';
import { AppointmentAttendanceComponent } from './appointment-attendance.component';
import { WeekComponent }                  from './week.component';
import { WalkInCheckInComponent }         from './walk-in-check-in.component';
import { StatisticsComponent }            from './statistics.component';
import { PatientComponent }               from './patient.component';
import { AnonComponent }                  from './anon.component';
import { AcceptOfferComponent }           from './accept-offer.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'appointment',
        component: AppointmentComponent,
        children: [
          { path: 'today', component: AppointmentTodayComponent },
          { path: 'accept/:secret', component: AcceptOfferComponent },
          { path: 'week', component: WeekComponent },
          { path: 'walk-in-check-in', component: WalkInCheckInComponent },
          { path: 'patient/:id', component: PatientComponent },
          { path: 'rooms', component: AppointmentRoomsComponent },
          { path: 'attendance', component: AppointmentAttendanceComponent },
          { path: 'statistics', component: StatisticsComponent },
          { path: 'anon', component: AnonComponent },
          { path: ':id', component: AppointmentDetailComponent },
          { path: '', component: AppointmentScheduleComponent }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppointmentRoutingModule { }
