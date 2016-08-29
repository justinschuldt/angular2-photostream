import { Injectable } from '@angular/core';

export class Sample {
  constructor(public id: number, public name: string) { }
}

const SAMPLES: Sample[] = [
  new Sample(1, 'some thing'),
  new Sample(2, 'a second thing'),
  new Sample(3, 'this would make three things'),
  new Sample(4, 'four things total'),
];

const FETCH_LATENCY = 500;

@Injectable()
export class SampleService {

  getSamples() {
    return new Promise<Sample[]>(resolve => {
      setTimeout(() => { resolve(SAMPLES); }, FETCH_LATENCY);
    });
  }

  getSample(id: number | string) {
    return this.getSamples()
      .then(samples => samples.find(sample => sample.id === +id));
  }

}