export * from './table.service';
export * from './api.service';
export * from './token.service';

// from sample
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HttpModule, XHRBackend }              from '@angular/http';

// from beaoon-mobile
import {Injectable, Inject} from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { CommonModule }      from '@angular/common';

import { Observable }     from 'rxjs/Observable';

import {TableService} from './table.service';
import {ApiService} from './api.service';
import {TokenService} from './token.service';
//import {AzureService} from './azure.service';
//import { AzureServiceConfig } from './azure.service';

export class AzureServiceConfig {
    url: string = 'http://asdf.com/';
    authHeaderName: string = 'X-ZUMO-AUTH';
}

@Injectable()
export class AzureService {
    baseUrl: string = 'http://class-prop.com/';
    authHeaderName: string = 'CUSTOM-AUTH';
  constructor (
    public tokenService: TokenService,
    public tableService: TableService,
    public apiService: ApiService
    ) {
        console.debug('azureService constructor ran');
        // if (config) { this.baseUrl = config.url; };
        // if (config.authHeaderName) {
        //     this.authHeaderName = config.authHeaderName;
        // };
    }

    setAuthToken(token: string): void{
        this.tokenService.setAuthToken(token);
    }
    table(name: string): TableService{
        return this.tableService.table(this.baseUrl, this.authHeaderName, name);
    }
    api(name: string): ApiService {
        return this.apiService.api(this.baseUrl, this.authHeaderName, name);
    }
}

@NgModule({})
export class AzureServiceAAA {
    baseUrl: string = 'http://asdf.com/';
    authHeaderName: string = 'CUSTOM-AUTH';
    constructor (
        // private http: Http,
        public tokenService: TokenService,
        public tableService: TableService,
        public apiService: ApiService
        ) { console.debug('azureService constructor ran')
    }
    setUrl(url: string): void{
        console.log(url)
        this.baseUrl = url;
    }
    setAuthHeaderName(name: string){
        this.authHeaderName = name;
    }
    setAuthToken(token: string): void{
        this.tokenService.setAuthToken(token);
    }
    table(name: string): TableService{
        return this.tableService.table(this.baseUrl, this.authHeaderName, name);
    }
    api(name: string): ApiService {
        return this.apiService.api(this.baseUrl, this.authHeaderName, name);
    }


}
