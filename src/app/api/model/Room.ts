'use strict';
import * as models from './models';

export interface Room {
    

    name?: string;

    description?: string;

    id?: number;

    created?: Date;

    modified?: Date;

    createdBy?: number;

    modifiedBy?: number;
}
