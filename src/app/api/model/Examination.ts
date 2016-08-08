'use strict';
import * as models from './models';

export interface Examination {
    

    name?: string;

    duration?: number;

    id?: number;

    created?: Date;

    modified?: Date;

    createdBy?: number;

    modifiedBy?: number;
}
