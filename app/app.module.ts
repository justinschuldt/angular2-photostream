import { NgModule, Component }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS, ConnectionBackend } from '@angular/http';

import { AzureService, TokenService }     from './azureService/azure.service';
import { SharedModule }     from './azureService/shared.module';


import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot()
  ],
  declarations: [ AppComponent ],
  bootstrap: [
    AppComponent,
    HTTP_PROVIDERS,
    ConnectionBackend
     ]
})
export class AppModule { }
