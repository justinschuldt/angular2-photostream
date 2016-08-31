import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'sample', loadChildren: 'app/sample/sample.module#SampleModule' },
  { path: 'image', loadChildren: 'app/image/image.module#ImageModule' }
];

export const appRoutingProviders: any[] = [

];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
