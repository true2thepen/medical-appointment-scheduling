'use strict';
import * as models from './models';

export interface Appointment {
    

    title?: string;

    description?: string;

    start?: Date;

    end?: Date;

    id?: number;

    created?: Date;

    modified?: Date;

    createdBy?: number;

    modifiedBy?: number;
}
