import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProviders, inject } from '@angular/core/testing';

import { About } from './about.component';

describe('About', () => {

  beforeEach(() => {
    addProviders([
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn) => fn({yourData: 'yolo'})
          }
        }
      },
      About
    ]);
  });

  it('should log ngOnInit', inject([ About ], (about) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    about.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
