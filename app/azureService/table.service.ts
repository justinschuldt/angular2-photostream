import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {TokenService} from './token.service';

@Injectable()
export class TableService {
    tableBase: string = 'tables/';
    tableName: string;
    tableUrl: string;
    token: string;
    authHeaderName: string;
    constructor (
        private http: Http,
        private tokenService: TokenService
    ) {
        console.log('table service ran');
        this.tokenService.token$
            .subscribe(
                token => this.token = token
            );
    }

    table(baseUrl: string, authHeaderName: string, name: string): TableService {
        this.tableUrl = baseUrl + this.tableBase;
        this.authHeaderName = authHeaderName;
        this.tableName = name;
        return this;
    }
    getAll(): Observable<any[]> {
        let fullUrl = this.tableUrl + this.tableName;

        let headers = new Headers({ [this.authHeaderName]: this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(fullUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getById(id: string): Observable<{}>{
        let fullUrl = this.tableUrl + this.tableName + '/' + id;
console.log('token: ', this.token);
        let headers = new Headers({ [this.authHeaderName]: this.token });

        let options = new RequestOptions({ headers: headers });
        console.log('options: ', options);
        return this.http.get(fullUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    insert(obj: {[key: string]: any}): Observable<{}>{
        let fullUrl = this.tableUrl + this.tableName;

        let body = JSON.stringify(obj);
        let headers = new Headers({ [this.authHeaderName]: this.token });
        headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(fullUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    update(obj: {id: string, [key: string]: any}): Observable<{}>{
        let fullUrl = this.tableUrl + this.tableName;

        let body = JSON.stringify(obj);
        let headers = new Headers({ [this.authHeaderName]: this.token });
        headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.patch(fullUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    delete(id: string): Observable<{}>{
        let fullUrl = this.tableUrl + this.tableName + '/' + id;

        let headers = new Headers({ [this.authHeaderName]: this.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(fullUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    undelete(id: string): Observable<{}>{
        let fullUrl = this.tableUrl + this.tableName + '/' + id;

        let headers = new Headers({ [this.authHeaderName]: this.token });
        headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(fullUrl, '', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    where(criteria: {}): Observable<[any]>{
        let queryString = '';
        for (var prop in criteria) {
            let value: any;
            let comparison = 'eq';
            if (typeof criteria[prop] === 'object' && !!criteria[prop]) {
                value = criteria[prop].value;
                comparison = criteria[prop].comparison;
            } else {
                // wrap in quotes if this is a string
                value = typeof criteria[prop] === 'string' ? `'${criteria[prop]}'` : criteria[prop];
            }
            queryString += `(${prop} ${comparison} ${value})`;
        }
        queryString = queryString.replace(/\)\(/g, ') and (');
        queryString = '?$filter=(' + encodeURIComponent(queryString) + ')';

        let fullUrl = this.tableUrl + this.tableName + queryString;

        let headers = new Headers({ [this.authHeaderName]: this.token });

        let options = new RequestOptions({ headers: headers });

        return this.http.get(fullUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        //console.debug('extractData res: ', res);
        let body = res.json();
        return body || { };
    }
    private handleError (error: any) {
        // TODO add a logging service
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}