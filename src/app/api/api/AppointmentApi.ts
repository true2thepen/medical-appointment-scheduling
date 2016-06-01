import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class AppointmentApi {
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
    public appointmentCount (where?: string, extraHttpRequestParams?: any ) : Observable<models.InlineResponse200> {
        const path = this.basePath + '/appointments/count';

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
    public appointmentCreate (data?: models.Appointment, extraHttpRequestParams?: any ) : Observable<models.Appointment> {
        const path = this.basePath + '/appointments';

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
    public appointmentCreateChangeStreamGetAppointmentsChangeStream (options?: string, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/appointments/change-stream';

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
    public appointmentCreateChangeStreamPostAppointmentsChangeStream (options?: string, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/appointments/change-stream';

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
    public appointmentDeleteById (id: string, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/appointments/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentDeleteById');
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
    public appointmentExistsGetAppointmentsidExists (id: string, extraHttpRequestParams?: any ) : Observable<models.InlineResponse2001> {
        const path = this.basePath + '/appointments/{id}/exists'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentExistsGetAppointmentsidExists');
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
    public appointmentExistsHeadAppointmentsid (id: string, extraHttpRequestParams?: any ) : Observable<models.InlineResponse2001> {
        const path = this.basePath + '/appointments/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentExistsHeadAppointmentsid');
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
    public appointmentFind (filter?: string, extraHttpRequestParams?: any ) : Observable<Array<models.Appointment>> {
        const path = this.basePath + '/appointments';

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
    public appointmentFindById (id: string, filter?: string, extraHttpRequestParams?: any ) : Observable<models.Appointment> {
        const path = this.basePath + '/appointments/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentFindById');
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
    public appointmentFindOne (filter?: string, extraHttpRequestParams?: any ) : Observable<models.Appointment> {
        const path = this.basePath + '/appointments/findOne';

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
    public appointmentPrototypeUpdateAttributes (id: string, data?: models.Appointment, extraHttpRequestParams?: any ) : Observable<models.Appointment> {
        const path = this.basePath + '/appointments/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeUpdateAttributes');
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
    public appointmentUpdateAll (where?: string, data?: models.Appointment, extraHttpRequestParams?: any ) : Observable<any> {
        const path = this.basePath + '/appointments/update';

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
    public appointmentUpsert (data?: models.Appointment, extraHttpRequestParams?: any ) : Observable<models.Appointment> {
        const path = this.basePath + '/appointments';

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
