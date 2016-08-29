import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';

// I think this is still needed, though it works without it...
// import { AzureService, AzureServiceConfig } from './azureService/azure.service';
import { SharedModule } from './azureService/shared.module';

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
export class AppModule { }
