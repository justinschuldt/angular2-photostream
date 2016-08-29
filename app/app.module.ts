import { NgModule, Component, Optional }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http,HttpModule, HTTP_PROVIDERS, ConnectionBackend } from '@angular/http';

import { AzureService }     from './azureService/azure.service';
import { AzureServiceConfig } from './azureService/azure.service';
import { SharedModule }     from './azureService/shared.module';


import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot({baseUrl: 'http://localhost:3000/', authHeaderName:'X-ZUMO-AUTH'})
  ],
  declarations: [ AppComponent ],
  bootstrap: [
    AppComponent
     ],
  providers: [HTTP_PROVIDERS]
})
export class AppModule {
  constructor (azureService: AzureService) { }
 }
