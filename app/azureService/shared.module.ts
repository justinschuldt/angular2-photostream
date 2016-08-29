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
export class SharedModule {

  constructor (@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
    static forRoot(config: AzureServiceConfig):ModuleWithProviders {
        return {
            ngModule: SharedModule,
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