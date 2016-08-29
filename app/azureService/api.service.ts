import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {TokenService} from './token.service';

@Injectable()
export class ApiService {
    apiBase: string = 'api/';
    routeName: string;
    apiUrl: string;
    token: string;
    authHeaderName: string;
    constructor(
        private http: Http,
        private tokenService: TokenService) {

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