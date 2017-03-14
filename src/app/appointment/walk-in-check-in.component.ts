import { Component }             from '@angular/core';
import { NgForm }                from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable }            from 'rxjs/Observable';
import { AppState }              from '../app.service';
import { FormControl }           from '@angular/forms';

import { Attendance }            from '../api/model/attendance';
import { Appointment }           from '../api/model/appointment';
import { AppointmentService }    from '../api/api/appointment.service';
import { Examination }           from '../api/model/examination';
import { ExaminationService }    from '../api/api/examination.service';
import { Patient }               from '../api/model/patient';
import { PatientService }        from '../api/api/patient.service';
import { Room }                  from '../api/model/room';
import { RoomService }           from '../api/api/room.service';
import { Translation,
  getI18nStrings }               from './appointment.translations';

import * as moment from 'moment';

@Component({
  templateUrl: './walk-in-check-in.component.html',
  styleUrls: [ './walk-in-check-in.component.scss' ]
})

export class WalkInCheckInComponent {

  // Patient autocomplete field
  private patientControl = new FormControl();
  private patients: Patient[] = [];
  private filteredPatients: Observable<Patient[]>;

  // Examinations autocomplete/tag field
  private examinations: Examination[] = [];

  // Duration input
  private durationControl = new FormControl();

  // Translation
  private trans: Translation;

  private rooms: Room[] = undefined;
  private filteredExaminations: Examination[] = undefined;
  private model: AppointmentViewModel = {
    id: undefined,
    title: undefined,
    description:
      localStorage.getItem('locale').startsWith('de') ? 'Akutpatient' : 'Walk-in patient',
    date: moment().format('l'),
    time: moment().format('LT'),
    duration: '30M',
    room: undefined,
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
    if ((<any>window)._mfq) {
      (<any>window)._mfq.push(['newPageView', '/appointment/walk-in-check-in']);
    }
    // This is a sub-page
    this._state.isSubPage.next(true);
    this._state.title.next(
      localStorage.getItem('locale').startsWith('de') ?
        'Akutpatienten anmelden' :
        'Walk-In Patient Check-In'
      );
    this._state.actions.next();
    this._state.primaryAction.next();

    this.trans = getI18nStrings();

    this.getAllRooms();

    // Set up patient autocomplete control
    this.patientService.patientFind().subscribe(
      (patients) => {
        this.patients = patients;
        this.filteredPatients = this.patientControl.valueChanges
         .startWith(null)
         .map(val => this.filterPatients(val));
      },
      (err) => console.log(err)
    );

    // Set up examinations control
    this.examinationService.examinationFind().subscribe(
      (examinations) => this.examinations = examinations,
      (err) => console.log(err)
    );

    // Set up duration control
    this.durationControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .map((val) => this.sanitizeDuration(val))
      .subscribe(
        (x) => this.model.duration = x,
        (err) => console.log(err)
      );
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
      roomId: this.model.room.id
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

  private filterPatients(val: string): Patient[] {
    return val ? this.patients.filter((patient) => new RegExp(val, 'gi').test(`${patient.surname} ${patient.givenName}`)) : this.patients;
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

  /**
   * Used to display patients in the suggestions drop down.
   */
  public patientDisplayFn(patient: Patient): string {
    return patient ? `${patient.givenName} ${patient.surname} (${moment(patient.dateOfBirth).format('l')})` : null;
  }

  /**
   * Used to display room names in the frontend.
   */
  public getRoomNameById(roomId: number): string {
    return this.getRoomById(roomId).name;
  }

  private getRoomById(roomId: number): Room {
    return this.rooms.find(
      (room) => {
        return room.id === roomId;
      }
    );
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

  /**
   * Triggered on duration input changes. Seeks to sanitize the entered value.
   */
  private sanitizeDuration(val: string) {
    if (val) {
      // Strip any whitespaces from anywhere
      val = val.replace(/\s/g, "");
      // Check different types of input
      if (/^[0-9]$/.test(val)) {
        val = val + 'H';
      } else if (/^[0-9]{2}$/.test(val)) {
        val = val + 'M';
      } else {
        val = val.toUpperCase();
      }
      // this.onFormChange(); // TODO
    }
    return val;
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
  room: Room;
  patient: Patient;
  examinations: Examination[];
}
