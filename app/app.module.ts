import { NgModule, Component }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http,HttpModule, HTTP_PROVIDERS, ConnectionBackend } from '@angular/http';

import { AzureService }     from './azureService/azure.service';
import { SharedModule }     from './azureService/shared.module';


import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot()
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
