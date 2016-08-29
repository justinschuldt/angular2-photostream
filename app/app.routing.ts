import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
 // { path: 'welcome', loadChildren: 'app/welcome/welcome.module#WelcomeModule' },
  { path: 'sample', loadChildren: 'app/sample/sample.module#SampleModule' },
  { path: 'images', loadChildren: 'app/image/image.module#ImageModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
