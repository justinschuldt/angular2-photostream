import {
    NgModule,
    ModuleWithProviders,
    Optional,
    SkipSelf
} from "@angular/core";

import {
    AzureService,
    AzureServiceConfig,
    ApiService,
    TableService,
    TokenService
} from "./azure.service";

@NgModule({})
export class AzureServiceModule {

  constructor (@Optional() @SkipSelf() parentModule: AzureServiceModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
    static forRoot(config: AzureServiceConfig):ModuleWithProviders {
        return {
            ngModule: AzureServiceModule,
            providers: [
                {provide: AzureServiceConfig, useValue: config},
                AzureService,
                TokenService,
                ApiService,
                TableService
            ]
        };
    }
}