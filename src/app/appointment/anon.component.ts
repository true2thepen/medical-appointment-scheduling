import { Component, OnInit }      from '@angular/core';
import { ViewChild }              from '@angular/core';
import { Router }                 from '@angular/router';
import { AppState, Action }       from '../app.service';

import { ViewAppointment }        from './appointment.viewmodel';
import { Appointment }            from '../api/model/appointment';
import { ViewAppointmentService } from './appointment.service';
import { PatientService }         from '../api/api/patient.service';

import * as moment                from 'moment';

import { Schedule }               from 'primeng/primeng';


@Component({
  templateUrl: './anon.html',
  styleUrls: [ './anon.style.scss' ]
})

export class AnonComponent implements OnInit {

  private appointments: ViewAppointment[];
  private locale: string;
  private hiddenDays: number[];
  private viewDate: moment.Moment;
  private minTime: moment.Duration = moment.duration('07:00:00');
  private maxTime: moment.Duration = moment.duration('20:00:00');
  private viewMode: String = 'basicWeek';
  private refreshCalendar: boolean = false; // Tiny hack to get fullcalendar to refresh
  @ViewChild(Schedule) private schedule: Schedule;

  constructor(
    private _state: AppState,
    private router: Router,
    private viewAppointmentService: ViewAppointmentService,
    private patientService: PatientService) {}

  ngOnInit() {
    this.viewDate = moment();
    this._state.isSubPage.next(false); // TODO block menu, this should be a dead-end
    this._state.title.next(this.getTitleFromViewDate());
    this._state.actions.next(this.getActions('agendaWeek'));
    this._state.primaryAction.next();
    this.getAllAppointments();
    this.locale = localStorage.getItem('locale').startsWith('de') ? 'de' : 'en';
    this.hiddenDays = [ 0 ]; // Hide Sundays by default
  }

  private getAllAppointments(): void {
    this.viewAppointmentService
    .appointmentFindAnonymous()
    .subscribe(
      x => this.appointments = x,
      e => console.log(e),
      () => console.log('Get all appointments complete')
    );
  }

  private handleNextClick() {
    this.viewDate = this.viewDate.add(1, 'week');
    this._state.title.next(this.getTitleFromViewDate());
    this.schedule.gotoDate(this.viewDate);
  }

  private handleTodayClick() {
    this.viewDate = moment();
    this._state.title.next(this.getTitleFromViewDate());
    this.schedule.gotoDate(this.viewDate);
  }

  private handlePrevClick() {
    this.viewDate = this.viewDate.subtract(1, 'week');
    this._state.title.next(this.getTitleFromViewDate());
    this.schedule.gotoDate(this.viewDate);
  }

  private handleViewModeChange(viewMode: String) {
    this.refreshCalendar = true;
    this.viewMode = viewMode;
    setTimeout(() => this.refreshCalendar = false, 0);
    this._state.actions.next(
      this.getActions(viewMode === 'agendaWeek' ? 'basicWeek' : 'agendaWeek')
    );
  }

  private getTitleFromViewDate() {
    let startString = this.viewDate.format('MMMM Do');
    let endString;
    let endOfWeekMoment = this.viewDate.clone().add(6, 'days');
    // Check if this week spreads over two months
    if (this.viewDate.month() === endOfWeekMoment.month()) {
      endString = endOfWeekMoment.format('Do YYYY');
    } else {
      endString = endOfWeekMoment.format('MMMM Do YYYY');
    }
    let weekString = this.viewDate.format('[Week] w');
    return startString + ' - ' + endString + ', ' + weekString;
  }

  private getActions(nextViewMode: String): Action[] {
    return [
      {
        icon: nextViewMode === 'basicWeek' ? 'list' : 'schedule',
        clickHandler: this.handleViewModeChange.bind(this, nextViewMode)
      },
      {
        icon: 'keyboard_arrow_left',
        clickHandler: this.handlePrevClick.bind(this)
      },
      {
        icon: 'today',
        clickHandler: this.handleTodayClick.bind(this)
      },
      {
        icon: 'keyboard_arrow_right',
        clickHandler: this.handleNextClick.bind(this)
      }
    ];
  }
}
