import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { AppointmentService } from './appointment.service';

@Component({
    selector: 'my-item-component',
    providers: [AppointmentService],
    template: 'IT WORKS!',
    directives: [CORE_DIRECTIVES]
})

export class MyItemComponent implements OnInit {

    constructor(private appointmentService: AppointmentService) { }

    ngOnInit() {
        this.getAllItems();
    }

    private getAllItems(): void {
        this.appointmentService
            .GetAll()
            .subscribe((data:any[]) => console.log(data),
                error => console.log(error),
                () => console.log('Get all Items complete'));
    }
}
