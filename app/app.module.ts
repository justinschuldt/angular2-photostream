import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';

// I think this is still needed, though it works without it...
// import { AzureService, AzureServiceConfig } from './azureService/azure.service';
import { AzureServiceModule } from './azureService/azure-service.module';

import { AppComponent }  from './app.component';

// Feature modules
import { CoreModule }     from './core/core.module';
import { routing }        from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    AzureServiceModule.forRoot({baseUrl: 'http://localhost:3000/', authHeaderName:'X-ZUMO-AUTH'}),
    CoreModule.forRoot({userName: 'J-Dizzle'}),
    routing
  ],
  declarations: [ AppComponent ],
  bootstrap: [
    AppComponent
     ],
  providers: [HTTP_PROVIDERS]
})
export class AppModule { }
