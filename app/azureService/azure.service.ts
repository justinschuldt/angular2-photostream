export * from './token.service';
export * from './table.service';
export * from './api.service';

import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { TableService } from './table.service';



import { Injectable, Optional } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

export class AzureServiceConfig {
    baseUrl: string = 'http://asdf.com/';
    authHeaderName: string = 'ASDF-AUTH';
}

@Injectable()
export class AzureService {
    private _baseUrl: string = 'http://class-property.com/';
    private _authHeaderName: string = 'CLASS-AUTH';
    private _token: string;
    constructor (
        @Optional() config: AzureServiceConfig,
        private tokenService: TokenService,
        private tableService: TableService,
        private apiService: ApiService
    ) {
        console.debug('azureService constructor ran with config: ', config);

        if (config && config.baseUrl) { 
            this._baseUrl = config.baseUrl; 
        };
        if (config && config.authHeaderName) {
            this._authHeaderName = config.authHeaderName;
        };
    }
    setAuthToken(token: string): void{
        this.tokenService.setAuthToken(token);
    }
    table(name: string): TableService{
        return this.tableService.table(this._baseUrl, this._authHeaderName, name);
    }
    api(name: string): ApiService {
        return this.apiService.api(this._baseUrl, this._authHeaderName, name);
    }
}
