'use strict';
import * as models from './models';

export interface Appointment {
    

    title?: string;

    description?: string;

    date?: Date;

    duration?: number;

    id?: number;

    created?: Date;

    modified?: Date;

    createdBy?: Date;

    modifiedBy?: Date;
}
