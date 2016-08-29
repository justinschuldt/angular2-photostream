import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { SampleListComponent }    from './sample-list.component';
import { SampleDetailComponent }  from './sample-detail.component';
import { SampleService } from './sample.service';
import { routing }       from './sample.routing';

@NgModule({
  imports:      [ CommonModule, routing ],
  declarations: [ SampleDetailComponent, SampleListComponent ],
  providers:    [ SampleService ]
})
export class SampleModule {}