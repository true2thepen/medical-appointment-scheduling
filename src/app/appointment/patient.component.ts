import { Component, OnInit }      from '@angular/core';
import { ViewContainerRef }       from '@angular/core';
import { ActivatedRoute }         from '@angular/router';
import { MdDialogRef, MdDialog,
 MdDialogConfig }                 from '@angular/material';

import { AppState }               from '../app.service';
import { Appointment }            from '../api/model/appointment';
import { Patient }                from '../api/model/patient';
import { PatientService }         from '../api/api/patient.service';
import { AppointmentService }     from '../api/api/appointment.service';
import { ViewAppointmentService } from './appointment.service';
import { ViewAppointment }        from './appointment.viewmodel';
import { PatientCancelAppointmentDialog } from './patient-cancel-appointment.dialog';

@Component({
  templateUrl: './patient.html',
  styleUrls: [ './patient.style.scss' ]
})
export class PatientComponent implements OnInit {

  private patient: Patient;
  private appointments: ViewAppointment[];
  private dialogRef: MdDialogRef<PatientCancelAppointmentDialog>;

  constructor(
    private _state: AppState,
    private appointmentService: AppointmentService,
    private viewAppointmentService: ViewAppointmentService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
    private dialog: MdDialog) {}

  ngOnInit() {
    this._state.isSubPage.next(true);
    this._state.title.next();
    this._state.actions.next();
    this._state.primaryAction.next();
    let param: string = this.route.snapshot.params['id'];
    this.patientService.patientFindById(param)
    .subscribe(
      patient => {
        this.patient = patient;
        this._state.title.next(patient.givenName + ' ' + patient.surname);
      },
      err => console.log(err)
    );
    this.findAppointments();
  }

  public openCancelAppointmentDialog(appointment: Appointment) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(PatientCancelAppointmentDialog, config);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.cancelAppointment(appointment);
      }
      this.dialogRef = null;
    });
  }

  private cancelAppointment(appointment: Appointment) {
    this.appointmentService.appointmentDeleteById(appointment.id.toString())
    .subscribe(
      null,
      err => console.log(err),
      () => {
        this.appointments = undefined;
        this.findAppointments();
      }
    );
  }

  private findAppointments() {
    let filter = {
      where: {
        patientId: this.route.snapshot.params['id']
      }
    };
    this.viewAppointmentService.appointmentFind(JSON.stringify(filter))
    .subscribe(
      appointments => this.appointments = appointments,
      err => console.log(err)
    );
  }
}
