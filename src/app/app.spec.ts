import { addProviders, inject } from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';

describe('AppComponent and AppState', () => {

  beforeEach(() => {
    addProviders([AppComponent, AppState]);
  });

  it('should have a url', inject([ AppComponent ], (app) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
