// export * from './table.service';
// export * from './api.service';
// export * from './token.service';
export * from './azure.service';

import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';

//import { TitleComponent }    from './title.component';
import { AzureService }       from './azure.service';
import { AzureServiceConfig } from './azure.service';

@NgModule({})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
    console.log('coreModule ran');
  }

  static forRoot(config: AzureServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: AzureServiceConfig, useValue: config }
      ]
    };
  }
}