import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }   from '@angular/http';

import { AppointmentService } from './api/appointment.service';
import { AuditLogEntryService } from './api/auditLogEntry.service';
import { ExaminationService } from './api/examination.service';
import { PatientService } from './api/patient.service';
import { RoomService } from './api/room.service';

@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [],
  exports:      [],
  providers:    [ AppointmentService, AuditLogEntryService, ExaminationService, PatientService, RoomService ]
})
export class ApiModule { }
