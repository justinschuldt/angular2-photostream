import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Image, ImageService } from './image.service';

@Component({
  template: `
    <h3 highlight>Image Detail</h3>
      <h4>{{image.title}}</h4>
      <img src="{{image.imageUrl}}">
      <div>{{image.createdAt | date}}</div>
      <div>Tags: 
        <span *ngFor="let sub of image?.tags">{{sub.tag}} </span>
      </div>
    <br>
    <a routerLink="../list">back</a>
  `
})
export class ImageDetailComponent implements OnInit {
  id: string;
  image: Image;
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService) {  }

  ngOnInit() {
    // image ids are not int soooo, idk.
     this.id = this.route.snapshot.params['id'];
     console.debug('id: ', this.id);
     this.imageService.getImage(this.id).subscribe(
       data => {
         console.log(data)
         //this.image = data;
       },
       error => console.error(error)
     )
  }
}
