import { Appointment }        from '../api/model/appointment';
import { Examination }        from '../api/model/examination';
import { Patient }            from '../api/model/patient';
import { Attendance }         from '../api/model/attendance';
import { Room }               from '../api/model/room';

export class ViewAppointment implements Appointment {

  // Implemented properties
  public created: Date;
  public createdBy: number;
  public description: string;
  public end: Date;
  public id: number;
  public modified: Date;
  public modifiedBy: number;
  public patientId: number;
  public roomId: number;
  public start: Date;
  public title: string;

  // Additional properties
  public attendance: Attendance;
  public examinations: Examination[];
  public patient: Patient;
  public room: Room;
  public backgroundColor: string;
  public borderColor: string;
  public color: string;

  constructor(data?: Appointment) {
    if (data) {
      this.created = data.created;
      this.createdBy = data.createdBy;
      this.description = data.description;
      this.end = data.end;
      this.id = data.id;
      this.modified = data.modified;
      this.modifiedBy = data.modifiedBy;
      this.patientId = data.patientId;
      this.roomId = data.roomId;
      this.start = data.start;
      this.title = data.title;
    }
  }

}
