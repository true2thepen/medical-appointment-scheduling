import { Routes, RouterModule }         from '@angular/router';

import { AppointmentComponent }         from './appointment.component';
import { AppointmentScheduleComponent } from './appointment-schedule.component';
import { AppointmentDetailComponent }   from './appointment-detail.component';
import { AppointmentRoomsComponent }    from './appointment-rooms.component';

const appointmentRoutes: Routes = [
  {
    path: 'appointment',
    component: AppointmentComponent,
    children: [
      { path: 'rooms', component: AppointmentRoomsComponent },
      { path: ':id', component: AppointmentDetailComponent },
      { path: '', component: AppointmentScheduleComponent }
    ]
  }
];

export const appointmentRouting = RouterModule.forChild(appointmentRoutes);
