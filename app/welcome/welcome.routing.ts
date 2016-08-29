import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { WelcomeComponent }    from './welcome.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'welcome', component: WelcomeComponent}
]);