import { Injectable }         from '@angular/core';

import { Observable }         from 'rxjs/Observable';
import * as async             from 'async';

import { AppointmentService } from '../api/api/appointment.service';
import { ViewAppointment }    from './appointment.viewmodel';
import { Appointment }        from '../api/model/appointment';
import { Examination }        from '../api/model/examination';
import { Patient }            from '../api/model/patient';
import { Attendance }         from '../api/model/attendance';
import { Room }               from '../api/model/room';

@Injectable()
export class ViewAppointmentService {

  constructor(private appointmentService: AppointmentService) {}

  public appointmentFind(filter?: string, extraHttpRequestParams?: any): Observable<Array<ViewAppointment>> {
    return this.appointmentService
    .appointmentFind(filter, extraHttpRequestParams)
    .map((x, idx) => {
      let obs: Observable<Array<ViewAppointment>> = Observable.create((subscriber) => {
        // Return temporary result to have something to display at least
        subscriber.next(x);

        async.map(
          x,
          (item: Appointment, cb) => {
            // For every appointment, create ViewAppointment...
            let viewAppointment = new ViewAppointment(item);

            // ... and resolve related models in parallel.
            async.parallel({

              // Room
              room: (callback) => {
                if (viewAppointment.roomId) {
                  this.appointmentService.appointmentPrototypeGetRoom(viewAppointment.id.toString())
                  .subscribe(
                    x => callback(null, x),
                    e => callback(e),
                    () => console.log('Completed inner resolving of room for appointment.')
                  );
                } else {
                  callback(null, undefined);
                }
              },

              // Patient
              patient: (callback) => {
                if (viewAppointment.patientId) {
                  this.appointmentService.appointmentPrototypeGetPatient(viewAppointment.id.toString())
                  .subscribe(
                    x => callback(null, x),
                    e => callback(e),
                    () => console.log('Completed inner resolving of patient for appointment.')
                  );
                } else {
                  callback(null, undefined);
                }
              },

              // Attendance
              attendance: (callback) => {
                this.appointmentService.appointmentPrototypeGetAttendance(viewAppointment.id.toString())
                .subscribe(
                  x => callback(null, x),
                  e => {
                    if (e._body.error.statusCode == 404 && e._body.error.code === 'MODEL_NOT_FOUND') {
                      callback(null, undefined);
                    } else {
                      callback(e);
                    }
                  },
                  () => console.log('Completed inner resolving of attendance for appointment.')
                );
              },

              // Examinations
              examinations: (callback) => {
                this.appointmentService.appointmentPrototypeGetExaminations(viewAppointment.id.toString())
                .subscribe(
                  x => callback(null, x),
                  e => callback(e),
                  () => console.log('Completed inner resolving of examinations for appointment.')
                );
              }

            }, function(err, results) {
              if(err) {
                cb(err);
              } else {
                viewAppointment.attendance = <Attendance> results['attendance'];
                viewAppointment.examinations = results['examinations'] as Array<Examination>;
                viewAppointment.patient = <Patient> results['patient'];
                viewAppointment.room = <Room> results['room'];

                // Event colors
                if (viewAppointment.examinations && viewAppointment.examinations.length > 0) {
                  viewAppointment.color = viewAppointment.examinations[0].color;
                  viewAppointment.backgroundColor = viewAppointment.examinations[0].backgroundColor;
                  viewAppointment.borderColor = viewAppointment.backgroundColor;
                }

                // Event title display
                if (!viewAppointment.title) {
                  if (viewAppointment.patient) {
                    viewAppointment.title = viewAppointment.patient.name;
                  }
                }

                cb(null, viewAppointment);
              }
            });

          },
          (err, results: ViewAppointment[]) => {
            if (err) {
              subscriber.error(err);
            } else {
              subscriber.next(results);
              subscriber.complete();
            }
          }
        );
      });
      return obs;
    })
    .concatAll();
  }
}
