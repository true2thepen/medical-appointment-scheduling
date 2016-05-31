'use strict';
import * as models from './models';

export interface AuditLogEntry {
    

    objectId?: number;

    author?: number;

    timestamp?: Date;

    id?: number;
}
