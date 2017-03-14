import { Component }   from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'patient-cancel-appointment-dialog',
  template: `
  <p i18n>Do you really want to cancel this appointment?</p>
  <button i18n type="button" (click)="dialogRef.close('yes')">YES</button>
  <button i18n type="button" (click)="dialogRef.close('no')">NO</button>
  `
})
export class PatientCancelAppointmentDialogComponent {
  constructor(public dialogRef: MdDialogRef<PatientCancelAppointmentDialogComponent>) {}
}
