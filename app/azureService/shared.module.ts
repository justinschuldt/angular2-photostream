import {NgModule, ModuleWithProviders} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from '@angular/http';


import {AzureService, ApiService, TokenService} from "./azure.service";
// import {TableService} from './table.service';
// import {ApiService} from './api.service';
// import {TokenService} from './token.service';

@NgModule({})
export class SharedModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [AzureService]
        };
    }
}