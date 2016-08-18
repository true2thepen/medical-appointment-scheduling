import { addProviders, async, inject } from '@angular/core/testing';
import { TestBed }                     from '@angular/core/testing/test_bed';
import { Component }                   from '@angular/core';
import {
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response }                           from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing/mock_backend';

import { Title }                       from './title.service';

describe('Title service', () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        Title
      ]
    });
  });

  it('should have http', inject([ Title ], (title) => {
    expect(!!title.http).toEqual(true);
  }));

  it('should get data from the server', inject([ Title ], (title) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    title.getData();
    expect(console.log).toHaveBeenCalled();
    expect(title.getData()).toEqual({ value: 'AngularClass' });
  }));

});
