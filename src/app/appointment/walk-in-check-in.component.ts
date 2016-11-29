import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable }            from 'rxjs/Observable';
import { AppState }              from '../app.service';

import { Attendance }            from '../api/model/attendance';
import { Appointment }           from '../api/model/appointment';
import { AppointmentService }    from '../api/api/appointment.service';
import { Examination }           from '../api/model/examination';
import { ExaminationService }    from '../api/api/examination.service';
import { Patient }               from '../api/model/patient';
import { PatientService }        from '../api/api/patient.service';
import { Room }                  from '../api/model/room';
import { RoomService }           from '../api/api/room.service';

import * as moment from 'moment';

@Component({
  templateUrl: './walk-in-check-in.html',
  styleUrls: [ './walk-in-check-in.style.scss' ]
})

export class WalkInCheckInComponent {
  private rooms: Room[] = undefined;
  private filteredPatients: Patient[] = undefined;
  private filteredExaminations: Examination[] = undefined;
  private model: AppointmentViewModel = {
    id: undefined,
    title: undefined,
    description:
      localStorage.getItem('locale').startsWith('de') ? 'Akutpatient' : 'Walk-in patient',
    date: moment().format('l'),
    time: moment().format('LT'),
    duration: '30M',
    roomId: undefined,
    patient: undefined,
    examinations: undefined
  };

  constructor(
    private _state: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private examinationService: ExaminationService,
    private roomService: RoomService,
    private patientService: PatientService) {}

  ngOnInit(): void {
    // Mouseflow integration
    _mfq.push(['newPageView', '/appointment/walk-in-check-in']);
    // This is a sub-page
    this._state.isSubPage.next(true);
    this._state.title.next(
      localStorage.getItem('locale').startsWith('de') ?
        'Akutpatienten anmelden' :
        'Walk-In Patient Check-In'
      );
    this._state.actions.next();
    this._state.primaryAction.next();
    this.getAllRooms();
  }

  onSubmit(): void {
    let newAppointment: Appointment  = {
      title: this.model.title,
      description: this.model.description,
      modified: new Date(),
      created: new Date(),
      modifiedBy: 0,
      createdBy: 0,
      patientId: this.model.patient.id,
      roomId: this.model.roomId
    };
    let examinations: Examination[] = this.model.examinations;
    let startDate = moment(this.model.date, 'l');
    let startTime = moment(this.model.time, 'LT');
    let start = startDate.clone();
    start.hour(startTime.hour());
    start.minute(startTime.minute());
    let end: moment.Moment = start.clone();
    end.add(moment.duration('PT' + this.model.duration));
    newAppointment.start = start.toDate();
    newAppointment.end = end.toDate();

    // Add appointment
    this.appointmentService
    .appointmentCreate(newAppointment)
    .subscribe(
      x => {
        // Link examinations
        if (examinations && examinations.length > 0) {
          for (let i = 0; i < examinations.length; ++i) {
            this.linkExaminationWithAppointment(x, examinations[i]);
          }
        }
        // Complete check-in
        this.checkIn(x).subscribe(
          null,
          err => console.log(err),
          () => {
            // Navigate back to schedule view
            this.router.navigateByUrl('appointment/attendance');
          }
        );
      },
      e => { console.log('onError: %o', e); },
      () => { console.log('Completed insert.'); }
    );
  }

  private linkExaminationWithAppointment(appointment: Appointment, examination: Examination) {
    this.appointmentService.appointmentPrototypeLinkExaminations(
      examination.id.toString(),
      appointment.id.toString())
    .subscribe(
      x => console.log(`Linked examination ${x.examinationId} with appointment ${x.appointmentId}`),
      e => console.log(e),
      () => console.log('Completed linking examination with appointment.')
    );
  }

  private getAllRooms(): void {
    this.roomService
    .roomFind()
    .subscribe(
      x => {
        this.rooms = x;
        if (x && x.length > 0) { // If we got rooms, use the first as default
          this.model.roomId = x[0].id;
        }
      },
      e => console.log(e),
      () => console.log('Get all rooms complete.')
    );
  }

  private findPatients(event) {
    this.patientService
    .patientFind(`{"where": {"surname": {"regexp": "${event.query}/i"}}}`)
    .subscribe(
      x => this.filteredPatients = x,
      e => console.log(e),
      () => console.log('Completed querying for patients.')
    );
  }

  private findExaminations(event) {
    this.examinationService
    .examinationFind(`{"where": {"name": {"regexp": "${event.query}/i"}}}`)
    .subscribe(
      x => this.filteredExaminations = x,
      e => console.log(e),
      () => console.log('Completed querying for examinations.')
    );
  }

  private getRoomNameById(roomId: number) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id === roomId) {
        return this.rooms[i].name;
      }
    }
  }

  private getAppointmentById(id: number) {
    this.appointmentService.appointmentFindById(id.toString())
      .subscribe(
        x => {
          let startDate = moment(x.start);
          let endDate = moment(x.end);
          let duration = moment.duration(endDate.diff(startDate));
          this.model.id = x.id;
          this.model.date = startDate.format('l');
          this.model.time = startDate.format('LT');
          this.model.duration = duration.toJSON().substring(2);
          this.model.title = x.title;
          this.model.description = x.description;
          if (x.patientId) {
            this.patientService.patientFindById(x.patientId.toString())
              .subscribe(
                y => this.model.patient = y,
                e => console.log(e),
                () => console.log('Completed querying for patient by id')
              );
          }
          this.model.roomId = x.roomId;
          this.appointmentService.appointmentPrototypeGetExaminations(x.id.toString())
            .subscribe(
              z => this.model.examinations = z,
              e => console.log(e),
              () => console.log('Completed querying for examinations by appointment id')
            );
        },
        e => console.log(e),
        () => console.log('Completed querying for appointment data')
      );
  }

  private checkIn(appointment: any): Observable<Attendance> { // TODO Fix any ViewAppointment
    // Prepare data
    let data: Attendance = {
      checkedIn: new Date()
    };

    // TODO check if this patient is already checked in, and allow/deny
    // this operation. Maybe we want to allow this, but in that case, we
    // would have to set checkedIn = underTreatment = new Date().

    return this.appointmentService
      .appointmentPrototypeCreateAttendance(appointment.id.toString(), data);
  }

  private humanizeDuration(durationString: String): String {
    return moment.duration('PT' + durationString).humanize();
  }
}

interface AppointmentViewModel {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  roomId: number;
  patient: Patient;
  examinations: Examination[];
}
