// export * from './table.service';
// export * from './api.service';
// export * from './token.service';

// from sample
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HttpModule, XHRBackend }              from '@angular/http';

// from beaoon-mobile
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CommonModule }      from '@angular/common';

import { Observable }     from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

// import {TableService} from './table.service';
// import {ApiService} from './api.service';
// import {TokenService} from './token.service';
// import {AzureService} from './azure.service';
// import { AzureServiceConfig } from './azure.service';

export class AzureServiceConfig {
    baseUrl: string = 'http://asdf.com/';
    authHeaderName: string = 'ASDF-AUTH';
}

@Injectable()
export class TokenService {

    // Observable string source
    private tokenSubject = new Subject<string>();

    // Observable string streams
    token$ = this.tokenSubject.asObservable();

    setAuthToken(token: string): void{
        this.tokenSubject.next(token);
    }
}

@Injectable()
export class ApiService {
    apiBase: string = 'api/';
    routeName: string;
    apiUrl: string;
    token: string;
    authHeaderName: string;
    constructor(
        private http: Http,
        public tokenService: TokenService
        ) {

        this.tokenService.token$
            .subscribe(
                token => this.token = token
            );
    }
    api(baseUrl: string, authHeaderName: string, name: string): ApiService {
        this.apiUrl = baseUrl + this.apiBase;
        this.authHeaderName = authHeaderName;
        this.routeName = name;
        return this;
    }
    post(obj: {[key: string]: any}): Observable<any>{
        let fullUrl = this.apiUrl + this.routeName;
        let body = JSON.stringify(obj);
        let headers = new Headers({ [this.authHeaderName]: this.token });
        headers.set('Content-Type', 'application/json');        let options = new RequestOptions({ headers: headers });
        return this.http.post(fullUrl, body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    put(obj: {[key: string]: any}): Observable<any>{
        let fullUrl = this.apiUrl + this.routeName;
        let body = JSON.stringify(obj);
        let headers = new Headers({ [this.authHeaderName]: this.token });
        headers.set('Content-Type', 'application/json');        let options = new RequestOptions({ headers: headers });
        return this.http.put(fullUrl, body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    patch(obj: {[key: string]: any}): Observable<any>{
        let fullUrl = this.apiUrl + this.routeName;
        let body = JSON.stringify(obj);
        let headers = new Headers({ [this.authHeaderName]: this.token });
        headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(fullUrl, body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    get(): Observable<any>{
        let fullUrl = this.apiUrl + this.routeName;
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

@Injectable()
export class TableService {
    tableBase: string = 'tables/';
    tableName: string;
    tableUrl: string;
    token: string;
    authHeaderName: string;
    constructor (
        private http: Http,
        private tokenService: TokenService) {
            console.log('tableService ran');

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
        console.debug('headers: ', headers);
        console.debug('options: ', options);
        return this.http.get(fullUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getById(id: string): Observable<{}>{
        let fullUrl = this.tableUrl + this.tableName + '/' + id;

        let headers = new Headers({ [this.authHeaderName]: this.token });

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

        return this.http.delete(fullUrl)
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


@Injectable()
export class AzureService {
    private _baseUrl: string = 'http://class-property.com/';
    private _authHeaderName: string = 'CLASS-AUTH';
    private _token: string;
  constructor (
    private http: Http,
    @Optional() config: AzureServiceConfig,
    private tokenService: TokenService,
    private tableService: TableService,
    private apiService: ApiService
    ) {
        console.debug('azureService constructor ran');
        if (config && config.baseUrl) { 
            console.debug('config made it to azureService: ', config);
            this._baseUrl = config.baseUrl; 
        };
        if (config && config.authHeaderName) {
            this._authHeaderName = config.authHeaderName;
        };
    }

    someFun(obj: {[key: string]: any}): Observable<any> {
        console.debug('Guess that worked: ', obj)
        let fullUrl = this._baseUrl + 'api/login';
        let body = JSON.stringify(obj);
        let headers = new Headers({ [this._authHeaderName]: '' });
        headers.set('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(fullUrl, body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    setAuthToken(token: string): void{
        this._token = token;
    }

    getImages(): Observable<any> {
        let fullUrl = this._baseUrl + 'tables/images';
        let headers = new Headers({ [this._authHeaderName]: this._token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(fullUrl, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    // table(name: string): TableService{
    //     return this.tableService.table(this._baseUrl, this._authHeaderName, name);
    // }
    // api(name: string): ApiService {
    //     return this.apiService.api(this.baseUrl, this.authHeaderName, name);
    // }
    private extractData(res: Response) {
        console.debug('extractData res: ', res);
        let body = res.json();
        return body || { };
    }
    private handleError (error: any) {
        // TODO add a logging service
        console.log('handleError error: ', error);
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
