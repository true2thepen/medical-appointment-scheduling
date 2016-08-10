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
    public defaultHeaders : Headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

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
     * Counts examinations of Appointment.
     *
     * @param id PersistedModel id
     * @param where Criteria to match model instances
     */
    public appointmentPrototypeCountExaminations (id: string, where?: string, extraHttpRequestParams?: any ) : Observable<models.InlineResponse200> {
        const path = this.basePath + '/appointments/{id}/examinations/count'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeCountExaminations');
        }
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
     * Creates a new instance in examinations of this model.
     *
     * @param id PersistedModel id
     * @param data
     */
    public appointmentPrototypeCreateExaminations (id: string, data?: models.Examination, extraHttpRequestParams?: any ) : Observable<models.Examination> {
        const path = this.basePath + '/appointments/{id}/examinations'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeCreateExaminations');
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
     * Deletes all examinations of this model.
     *
     * @param id PersistedModel id
     */
    public appointmentPrototypeDeleteExaminations (id: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/appointments/{id}/examinations'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeDeleteExaminations');
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
     * Delete a related item by id for examinations.
     *
     * @param fk Foreign key for examinations
     * @param id PersistedModel id
     */
    public appointmentPrototypeDestroyByIdExaminations (fk: string, id: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/appointments/{id}/examinations/{fk}'
            .replace('{' + 'fk' + '}', String(fk))
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'fk' is set
        if (!fk) {
            throw new Error('Missing required parameter fk when calling appointmentPrototypeDestroyByIdExaminations');
        }
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeDestroyByIdExaminations');
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
     * Check the existence of examinations relation to an item by id.
     *
     * @param fk Foreign key for examinations
     * @param id PersistedModel id
     */
    public appointmentPrototypeExistsExaminations (fk: string, id: string, extraHttpRequestParams?: any ) : Observable<boolean> {
        const path = this.basePath + '/appointments/{id}/examinations/rel/{fk}'
            .replace('{' + 'fk' + '}', String(fk))
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'fk' is set
        if (!fk) {
            throw new Error('Missing required parameter fk when calling appointmentPrototypeExistsExaminations');
        }
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeExistsExaminations');
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
     * Find a related item by id for examinations.
     *
     * @param fk Foreign key for examinations
     * @param id PersistedModel id
     */
    public appointmentPrototypeFindByIdExaminations (fk: string, id: string, extraHttpRequestParams?: any ) : Observable<models.Examination> {
        const path = this.basePath + '/appointments/{id}/examinations/{fk}'
            .replace('{' + 'fk' + '}', String(fk))
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'fk' is set
        if (!fk) {
            throw new Error('Missing required parameter fk when calling appointmentPrototypeFindByIdExaminations');
        }
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeFindByIdExaminations');
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
     * Queries examinations of Appointment.
     *
     * @param id PersistedModel id
     * @param filter
     */
    public appointmentPrototypeGetExaminations (id: string, filter?: string, extraHttpRequestParams?: any ) : Observable<Array<models.Examination>> {
        const path = this.basePath + '/appointments/{id}/examinations'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeGetExaminations');
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
     * Fetches belongsTo relation patient.
     *
     * @param id PersistedModel id
     * @param refresh
     */
    public appointmentPrototypeGetPatient (id: string, refresh?: boolean, extraHttpRequestParams?: any ) : Observable<models.Patient> {
        const path = this.basePath + '/appointments/{id}/patient'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeGetPatient');
        }
        if (refresh !== undefined) {
            queryParameters.set('refresh', refresh.toString());
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
     * Fetches belongsTo relation room.
     *
     * @param id PersistedModel id
     * @param refresh
     */
    public appointmentPrototypeGetRoom (id: string, refresh?: boolean, extraHttpRequestParams?: any ) : Observable<models.Room> {
        const path = this.basePath + '/appointments/{id}/room'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeGetRoom');
        }
        if (refresh !== undefined) {
            queryParameters.set('refresh', refresh.toString());
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
     * Add a related item by id for examinations.
     *
     * @param fk Foreign key for examinations
     * @param id PersistedModel id
     * @param data
     */
    public appointmentPrototypeLinkExaminations (fk: string, id: string, data?: models.AppointmentExamination, extraHttpRequestParams?: any ) : Observable<models.AppointmentExamination> {
        const path = this.basePath + '/appointments/{id}/examinations/rel/{fk}'
            .replace('{' + 'fk' + '}', String(fk))
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'fk' is set
        if (!fk) {
            throw new Error('Missing required parameter fk when calling appointmentPrototypeLinkExaminations');
        }
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeLinkExaminations');
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
     * Remove the examinations relation to an item by id.
     *
     * @param fk Foreign key for examinations
     * @param id PersistedModel id
     */
    public appointmentPrototypeUnlinkExaminations (fk: string, id: string, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/appointments/{id}/examinations/rel/{fk}'
            .replace('{' + 'fk' + '}', String(fk))
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'fk' is set
        if (!fk) {
            throw new Error('Missing required parameter fk when calling appointmentPrototypeUnlinkExaminations');
        }
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeUnlinkExaminations');
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
     * Update a related item by id for examinations.
     *
     * @param fk Foreign key for examinations
     * @param id PersistedModel id
     * @param data
     */
    public appointmentPrototypeUpdateByIdExaminations (fk: string, id: string, data?: models.Examination, extraHttpRequestParams?: any ) : Observable<models.Examination> {
        const path = this.basePath + '/appointments/{id}/examinations/{fk}'
            .replace('{' + 'fk' + '}', String(fk))
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'fk' is set
        if (!fk) {
            throw new Error('Missing required parameter fk when calling appointmentPrototypeUpdateByIdExaminations');
        }
        // verify required parameter 'id' is set
        if (!id) {
            throw new Error('Missing required parameter id when calling appointmentPrototypeUpdateByIdExaminations');
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
