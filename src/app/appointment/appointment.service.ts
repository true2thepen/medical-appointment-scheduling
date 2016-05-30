import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class AppointmentService {

  private apiUrl: string = 'http://localhost:3000/api';

  constructor(private http: Http) { }

  public GetAll() {
    return this.http.get(this.apiUrl + '/appointments/').map(res => res.json());
  }
}
