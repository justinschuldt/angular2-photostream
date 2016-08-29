import { Component, OnInit } from '@angular/core';

import { Sample,
         SampleService }     from './sample.service';

@Component({
  template: `
    <h3 highlight>Sample List</h3>
    <div *ngFor='let item of samples | async'>
      <a routerLink="{{'../' + item.id}}">{{item.id}} - {{item.name}}</a>
    </div>
  `
})
export class SampleListComponent implements OnInit {
  samples: Promise<Sample[]>;

  constructor(private sampleService: SampleService) { }

  ngOnInit() {
    this.samples = this.sampleService.getSamples();
  }
}