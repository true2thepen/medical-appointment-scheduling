import {
  inject,
  TestBed
} from '@angular/core/testing';

import { Location }    from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';

describe('AppComponent', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppState,
      AppComponent,
      {provide: Location, useClass: SpyLocation}
    ]}));

  xit('should have a url', inject([ AppComponent ], (app: AppComponent) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
