import {NgModule, ModuleWithProviders} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from '@angular/http';


import {AzureService, ApiService, TokenService, TableService} from "./azure.service";
import { AzureServiceConfig } from './azure.service';
// import {TableService} from './table.service';
// import {ApiService} from './api.service';
// import {TokenService} from './token.service';

@NgModule({})
export class SharedModule {
    static forRoot(config: AzureServiceConfig):ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [{provide: AzureServiceConfig, useValue: config}, AzureService, TokenService, ApiService, TableService]
        };
    }
}