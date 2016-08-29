import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

@Component({
  template: `
    <h3 highlight>Image Detail</h3>
    <div>Image id: {{id}}</div>
    <br>
    <a routerLink="../list">Image List</a>
  `
})
export class ImageDetailComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute) {  }

  ngOnInit() {
    // image ids are not int soooo, idk.
    // this.id = parseInt(this.route.snapshot.params['id'], 10);
  }
}
