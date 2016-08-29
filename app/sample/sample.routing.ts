import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { SampleListComponent }    from './sample-list.component';
import { SampleDetailComponent }  from './sample-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list',    component: SampleListComponent },
  { path: ':id', component: SampleDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
