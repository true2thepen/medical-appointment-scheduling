import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class AuditLogEntryApi {
    protected basePath = 'http://localhost:3000/api';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * Count instances of the model matched by where from the data source.
     * 
     * @param where Criteria to match model instances
     */
    public auditLogEntryCount (where?: string, extraHttpRequestParams?: any ) : Observable<models.InlineResponse200> {
        const path = this.basePath + '/AuditLogEntries/count';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (where !== undefined) {
            queryParameters.set('where', where);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Create a new instance of the model and persist it into the data source.
     * 
     * @param data Model instance data
     */
    public auditLogEntryCreate (data?: models.AuditLogEntry, extraHttpRequestParams?: any ) : Observable<models.AuditLogEntry> {
        const path = this.basePath + '/AuditLogEntries';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(data);

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Create a change stream.
     * 
     * @param options 
     */
    public auditLogEntryCreateChangeStreamGetAuditLogEntriesChangeStream (options?: string, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/AuditLogEntries/change-stream';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (options !== undefined) {
            queryParameters.set('options', options);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Create a change stream.
     * 
     * @param options 
     */
    public auditLogEntryCreateChangeStreamPostAuditLogEntriesChangeStream (options?: string, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/AuditLogEntries/change-stream';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let formParams = new URLSearchParams();

        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams['options'] = options;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Delete a model instance by id from the data source.
     * 
     * @param id Model id
     */
    public auditLogEntryDeleteById (id: string, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/AuditLogEntries/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling auditLogEntryDeleteById');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Check whether a model instance exists in the data source.
     * 
     * @param id Model id
     */
    public auditLogEntryExistsGetAuditLogEntriesidExists (id: string, extraHttpRequestParams?: any ) : Observable<models.InlineResponse2001> {
        const path = this.basePath + '/AuditLogEntries/{id}/exists'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling auditLogEntryExistsGetAuditLogEntriesidExists');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Check whether a model instance exists in the data source.
     * 
     * @param id Model id
     */
    public auditLogEntryExistsHeadAuditLogEntriesid (id: string, extraHttpRequestParams?: any ) : Observable<models.InlineResponse2001> {
        const path = this.basePath + '/AuditLogEntries/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling auditLogEntryExistsHeadAuditLogEntriesid');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'HEAD',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     * 
     * @param filter Filter defining fields, where, include, order, offset, and limit
     */
    public auditLogEntryFind (filter?: string, extraHttpRequestParams?: any ) : Observable<Array<models.AuditLogEntry>> {
        const path = this.basePath + '/AuditLogEntries';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (filter !== undefined) {
            queryParameters.set('filter', filter);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Find a model instance by id from the data source.
     * 
     * @param id Model id
     * @param filter Filter defining fields and include
     */
    public auditLogEntryFindById (id: string, filter?: string, extraHttpRequestParams?: any ) : Observable<models.AuditLogEntry> {
        const path = this.basePath + '/AuditLogEntries/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling auditLogEntryFindById');
        }
        if (filter !== undefined) {
            queryParameters.set('filter', filter);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Find first instance of the model matched by filter from the data source.
     * 
     * @param filter Filter defining fields, where, include, order, offset, and limit
     */
    public auditLogEntryFindOne (filter?: string, extraHttpRequestParams?: any ) : Observable<models.AuditLogEntry> {
        const path = this.basePath + '/AuditLogEntries/findOne';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (filter !== undefined) {
            queryParameters.set('filter', filter);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Update attributes for a model instance and persist it into the data source.
     * 
     * @param id PersistedModel id
     * @param data An object of model property name/value pairs
     */
    public auditLogEntryPrototypeUpdateAttributes (id: string, data?: models.AuditLogEntry, extraHttpRequestParams?: any ) : Observable<models.AuditLogEntry> {
        const path = this.basePath + '/AuditLogEntries/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling auditLogEntryPrototypeUpdateAttributes');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(data);

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Update instances of the model matched by where from the data source.
     * 
     * @param where Criteria to match model instances
     * @param data An object of model property name/value pairs
     */
    public auditLogEntryUpdateAll (where?: string, data?: models.AuditLogEntry, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/AuditLogEntries/update';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (where !== undefined) {
            queryParameters.set('where', where);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(data);

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * Update an existing model instance or insert a new one into the data source.
     * 
     * @param data Model instance data
     */
    public auditLogEntryUpsert (data?: models.AuditLogEntry, extraHttpRequestParams?: any ) : Observable<models.AuditLogEntry> {
        const path = this.basePath + '/AuditLogEntries';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(data);

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

}
