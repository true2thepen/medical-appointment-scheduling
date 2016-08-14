import { Routes, RouterModule }         from '@angular/router';

import { AppointmentComponent }         from './appointment.component';
import { AppointmentScheduleComponent } from './appointment-schedule.component';
import { AppointmentDetailComponent }   from './appointment-detail.component';

const appointmentRoutes: Routes = [
  {
    path: 'appointment',
    component: AppointmentComponent,
    children: [
      { path: ':id', component: AppointmentDetailComponent },
      { path: '', component: AppointmentScheduleComponent }
    ]
  }
];

export const appointmentRouting = RouterModule.forChild(appointmentRoutes);
