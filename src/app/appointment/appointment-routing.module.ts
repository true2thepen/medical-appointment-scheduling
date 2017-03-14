import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AcceptOfferComponent }           from './accept-offer.component';
import { AnonComponent }                  from './anon.component';
import { AppointmentAttendanceComponent } from './attendance.component';
import { AppointmentComponent }           from './appointment.component';
import { AppointmentDetailComponent }     from './detail.component';
import { AppointmentRoomsComponent }      from './rooms.component';
import { AppointmentScheduleComponent }   from './schedule.component';
import { AppointmentTodayComponent }      from './today.component';
import { PatientComponent }               from './patient.component';
import { StatisticsComponent }            from './statistics.component';
import { WalkInCheckInComponent }         from './walk-in-check-in.component';
import { WeekComponent }                  from './week.component';

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
