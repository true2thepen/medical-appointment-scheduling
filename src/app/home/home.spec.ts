import { addProviders, inject } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { HomeComponent } from './home.component';
import { Title } from './title';

describe('HomeComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    addProviders([
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend, defaultOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },

      AppState,
      Title,
      HomeComponent
    ]);
  });

  it('should have default data', inject([ HomeComponent ], (home) => {
    expect(home.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ HomeComponent ], (home) => {
    expect(!!home.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ HomeComponent ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
