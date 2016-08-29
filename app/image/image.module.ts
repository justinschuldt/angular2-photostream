import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ImageListComponent }    from './image-list.component';
import { ImageDetailComponent }  from './image-detail.component';
import { ImageService } from './image.service';
import { routing }       from './image.routing';

@NgModule({
  imports:      [ CommonModule, routing ],
  declarations: [ ImageDetailComponent, ImageListComponent ],
  providers:    [ ImageService ]
})
export class ImageModule {}