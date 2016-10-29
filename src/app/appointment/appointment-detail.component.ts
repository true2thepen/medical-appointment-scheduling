import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../app.service';

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
  template: require('./appointment-detail.html'),
  styles: [ require('./appointment-detail.style.scss') ]
})

export class AppointmentDetailComponent {

  private editing: boolean = false;
  private rooms: Room[] = undefined;
  private filteredPatients: Patient[] = undefined;
  private filteredExaminations: Examination[] = undefined;
  private proposedTimeSlots: any[] = [];
  private model: AppointmentViewModel = {
    id: undefined,
    title: undefined,
    description: undefined,
    date: undefined,
    time: undefined,
    duration: undefined,
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
    let param: string = this.route.snapshot.params['id'];

    // This is a sub-page
    this._state.isSubPage.next(true);
    this._state.title.next();
    this._state.actions.next();
    this._state.primaryAction.next();

    // Create new appointment
    if (param === 'add') {
      this.editing = true;

    // View or edit existing appointment
    } else if (Number(param) !== NaN) {
      this.editing = false;
      console.log('displaying appointment with id: %d', Number(param));
      this.getAppointmentById(Number(param));
    }
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
    let start: moment.Moment = moment(this.model.date + ' ' + this.model.time);
    let end: moment.Moment = start.clone();
    end.add(moment.duration(this.model.duration));
    newAppointment.start = start.toDate();
    newAppointment.end = end.toDate();

    // Add...
    if (!this.model.id) {
      this.appointmentService
      .appointmentCreate(newAppointment)
      .subscribe(
        x => {
          for (let i = 0; i < examinations.length; ++i) {
            this.linkExaminationWithAppointment(x, examinations[i]);
          }
        },
        e => { console.log('onError: %o', e); },
        () => { console.log('Completed insert.'); }
      );

    // ...or update
    } else {
      this.appointmentService
      .appointmentPrototypeUpdateAttributes(this.model.id.toString(), newAppointment)
      .subscribe(
        x => {
          for (let i = 0; i < examinations.length; ++i) {
            this.linkExaminationWithAppointment(x, examinations[i]);
          }
        },
        e => { console.log('onError: %o', e); },
        () => { console.log('Completed update.'); }
      );
    }

    // Navigate back to schedule view
    this.router.navigateByUrl('appointment');
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
      x => this.rooms = x,
      e => console.log(e),
      () => console.log('Get all rooms complete.')
    );
  }

  private findPatients(event) {
    this.patientService
    .patientFind(`{"where": {"name": {"regexp": "${event.query}/i"}}}`)
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

  private findTime(
    duration?: string,
    examinationId?: number,
    roomId?: number,
    startDate?: moment.Moment
  ) {
    console.log('Querying for the next free time slot.');
    this.appointmentService
    .appointmentFindTime(
      duration ? duration : 'PT40M', // TODO move to server and replace by configurable default
      examinationId,
      roomId,
      startDate ? startDate.toDate() : undefined)
    .subscribe(
      x => this.proposedTimeSlots.push(x),
      e => console.log(e),
      () => console.log('Completed querying for the next free time slot.')
    );
  }

  private onFormChange() {
     // Every time the form changes, use latest information to find a suitable date
    if (this.model.duration) {
      this.proposedTimeSlots = [];
      this.findTime(
        this.model.duration,
        this.model.examinations && this.model.examinations.length > 0 ?
          this.model.examinations[0].id : undefined,
        this.model.roomId,
        moment()
      );
      this.findTime(
        this.model.duration,
        this.model.examinations && this.model.examinations.length > 0 ?
          this.model.examinations[0].id : undefined,
        this.model.roomId,
        moment().add(1, 'day')
      );
      this.findTime(
        this.model.duration,
        this.model.examinations && this.model.examinations.length > 0 ?
          this.model.examinations[0].id : undefined,
        this.model.roomId,
        moment().add(1, 'week')
      );
      this.findTime(
        this.model.duration,
        this.model.examinations && this.model.examinations.length > 0 ?
          this.model.examinations[0].id : undefined,
        this.model.roomId,
        moment().add(1, 'month')
      );
    }
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
          this.model.date = startDate.format('Y-MM-DD');
          this.model.time = startDate.format('HH:mm');
          this.model.duration = duration.toJSON();
          this.model.title = x.title;
          this.model.description = x.description;
          this.model.roomId = x.roomId;
          if (x.patientId) {
            this.patientService.patientFindById(x.patientId.toString())
              .subscribe(
                y => this.model.patient = y,
                e => console.log(e),
                () => console.log('Completed querying for patient by id')
              );
          }
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

  private applySuggestion(timeSlot: any) {
    if (timeSlot) {
      console.log(timeSlot);
      let startDate = moment(timeSlot.start);
      this.model.duration = `PT${timeSlot.duration}M`;
      this.model.date = startDate.format('Y-MM-DD');
      this.model.time = startDate.format('HH:mm');
      this.model.roomId = timeSlot.resources[0];

      // Clear suggestions
      this.proposedTimeSlots = [];
    }
  }

  private handleEditClick() {
    this.editing = true;
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
