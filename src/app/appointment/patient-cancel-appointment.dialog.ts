import { Component }   from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'patient-cancel-appointment-dialog',
  template: `
  <p>Do you really want to cancel this appointment?</p>
  <button type="button" (click)="dialogRef.close('yes')">YES</button>
  <button type="button" (click)="dialogRef.close('no')">NO</button>
  `
})
export class PatientCancelAppointmentDialog {
  constructor(public dialogRef: MdDialogRef<PatientCancelAppointmentDialog>) {}
}
