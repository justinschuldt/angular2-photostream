import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

@Component({
  template: `
    <h3 highlight>Sample Detail</h3>
    <div>Sample id: {{id}}</div>
    <br>
    <a routerLink="../list">Sample List</a>
  `
})
export class SampleDetailComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute) {  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params['id'], 10);
  }
}
