import { Injectable }         from '@angular/core';

import { Observable }         from 'rxjs/Observable';

import { AppointmentService } from '../api/api/appointment.service';
import { ViewAppointment }    from './appointment.viewmodel';

@Injectable()
export class ViewAppointmentService {

  constructor(private appointmentService: AppointmentService) {}

  public appointmentFind(
    filter?: string,
    extraHttpRequestParams?: any): Observable<Array<ViewAppointment>> {

    return this.appointmentService.appointmentFindDeep(filter, extraHttpRequestParams)
      .map((x, idx) => {
        // Event colors
        for (let i = x.length - 1; i >= 0; i--) {
          if (x[i].examinations && x[i].examinations.length > 0) {
            x[i].color = x[i].examinations[0].color;
            x[i].backgroundColor = x[i].examinations[0].backgroundColor;
            x[i].borderColor = x[i].backgroundColor;
          }
          // Event title display
          if (!x[i].title) {
            if (x[i].patient) {
              x[i].title =
              `${x[i].patient.givenName} ${x[i].patient.surname}`;
            }
          }
        }
        return x;
      });
  }
}
