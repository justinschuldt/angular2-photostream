import { Component, OnInit } from '@angular/core';

import { Image,
         ImageService }     from './image.service';

@Component({
  template: `
    <h3 highlight>Image List</h3>
    <div *ngFor='let item of images | async'>
      <a routerLink="{{'../' + item.id}}">{{item.name}}</a>
    </div>
  `
})
export class ImageListComponent implements OnInit {
  images: Image[];

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getImages()
      .subscribe(
        data => this.images = data,
        error => console.error(error)
      )
  }
}