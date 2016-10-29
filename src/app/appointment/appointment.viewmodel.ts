import { Appointment }        from '../api/model/appointment';
import { Examination }        from '../api/model/examination';
import { Patient }            from '../api/model/patient';
import { Attendance }         from '../api/model/attendance';
import { Room }               from '../api/model/room';

export class ViewAppointment implements Appointment {

  // Implemented properties
  created: Date;
  createdBy: number;
  description: string;
  end: Date;
  id: number;
  modified: Date;
  modifiedBy: number;
  patientId: number;
  roomId: number;
  start: Date;
  title: string;

  // Additional properties
  attendance: Attendance;
  examinations: Examination[];
  patient: Patient;
  room: Room;
  backgroundColor: string;
  borderColor: string;
  color: string;

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
