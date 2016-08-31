import { Component, OnInit } from '@angular/core';

import { Image,
         ImageService }     from './image.service';
import { Observable }     from 'rxjs/Observable';

@Component({
  template: `
    <h3 highlight>Image List</h3>
    <div *ngFor='let item of images | async'>
      <a routerLink="{{'../' + item.id}}">
        <h3>{{item.title}}</h3>
      </a>
      <img src="{{item.imageUrl}}" style="height:250px">
      <div>{{item.createdAt | date}}</div>
      <div>Tags: 
        <span *ngFor="let sub of item.tags">{{sub.tag}} </span>
      </div>
    </div>
  `
})
export class ImageListComponent implements OnInit {
  images: Observable<Image[]>;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.images = this.imageService.getImages()
  }
  // TODO add ngOnDestroy?
}