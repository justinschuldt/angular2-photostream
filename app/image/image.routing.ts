import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { ImageListComponent }    from './image-list.component';
import { ImageDetailComponent }  from './image-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list',    component: ImageListComponent },
  { path: ':id', component: ImageDetailComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
