import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared/shared.module';

import { WelcomeComponent }   from './welcome.component';
import { WelcomeService }     from './welcome.service';
import { routing }            from './welcome.routing';

@NgModule({
  imports:      [ SharedModule, routing ],
  declarations: [ WelcomeComponent ],
  providers:    [ WelcomeService ]
})
export class WelcomeModule { }
