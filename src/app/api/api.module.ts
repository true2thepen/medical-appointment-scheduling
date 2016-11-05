import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }   from '@angular/http';

import { AppointmentService } from './api/appointment.service';
import { AttendanceService } from './api/attendance.service';
import { AuditLogEntryService } from './api/auditLogEntry.service';
import { ExaminationService } from './api/examination.service';
import { MailService } from './api/mail.service';
import { PatientService } from './api/patient.service';
import { RoomService } from './api/room.service';

@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [],
  exports:      [],
  providers:    [ AppointmentService, AttendanceService, AuditLogEntryService, ExaminationService, MailService, PatientService, RoomService ]
})
export class ApiModule {}
