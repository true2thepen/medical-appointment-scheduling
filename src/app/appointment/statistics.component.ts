import { Component, OnInit }  from '@angular/core';

import { Attendance }         from '../api/model/attendance';
import { AppointmentService } from '../api/api/appointment.service';
import { AttendanceService }  from '../api/api/attendance.service';

import { AppState }           from '../app.service';

import * as moment from 'moment';
import * as async  from 'async';

@Component({
  template: require('./statistics.html'),
  styles: [ require('./statistics.style.scss') ]
})
export class StatisticsComponent implements OnInit {

  constructor(
    private _state: AppState,
    private attendanceService: AttendanceService,
    private appointmentService: AppointmentService) {}

  ngOnInit() {
    this._state.isSubPage.next(false);
    this._state.title.next('Statistics');
    this._state.actions.next();
    this._state.primaryAction.next();

    // Retrieve data for statistics
    this.attendanceService.attendanceFind()
    .subscribe(
      attendances => {
        let data: number[][] = [];

        async.each(attendances, (attendance: Attendance, callback: Function) => {
          this.appointmentService.appointmentFindById(attendance.appointmentId.toString())
          .subscribe(
            appointment => {
              // Calculate actual offset from planned time in minutes for box plot
              let offset = moment.duration(moment(attendance.underTreatment).diff(moment(appointment.start))).asMinutes();
              offset = Math.round( offset * 10 ) / 10;

              let dayOfWeek = moment(appointment.start).isoWeekday();
              if(!data[dayOfWeek]) {
                data[dayOfWeek] = [];
              }
              data[dayOfWeek].push(offset);
            },
            err => callback(err),
            () => callback()
          );
        }, (err) => {
          if( err ) {
            console.log(err);
          } else {
            this.plot(data);
          }
        });
      },
      error => console.log(error),
      () => {}
    );
  }

  private plot(data: number[][]) {
    let plotData: PlotlyTrace[] = [];
    for (let i = 0; i < data.length; i++) {
      plotData.push({
        y: data[i],
        name: moment().isoWeekday(i).format('dddd'),
        boxpoints: 'suspectedoutliers',
        marker: {
          color: this.colors[i],
          outliercolor: 'rgba(219, 64, 82, 0.6)',
          line: {
            outliercolor: 'rgba(219, 64, 82, 1.0)',
            outlierwidth: 2
          }
        },
        type: 'box'
      });
    }
    let layout = {
      yaxis: {
        title: 'Minutes',
        zeroline: false,
        gridcolor: 'rgba(0, 0, 0, 0.1)'
      },
      boxmode: 'group',
      showlegend: false
    };

    Plotly.newPlot('boxplot', plotData, layout, {displayModeBar: false});
  }

  private colors: string[] = [
    '#00bcd4', '#4caf50', '#cddc39', '#ff9800', '#e91e63', '#673ab7', '#9c27b0'
  ];
}

declare var Plotly: any;

declare interface PlotlyTrace {
  y: number[];
  x?: number[];
  type: string;
  name: string;
  marker: PlotlyMarker;
  boxpoints: string;
}

declare interface PlotlyMarker {
  color: string;
  outliercolor: string;
  line: {
    outliercolor: string;
    outlierwidth: number;
  };
}
