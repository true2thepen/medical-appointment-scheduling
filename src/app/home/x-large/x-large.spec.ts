import { addProviders, async, inject } from '@angular/core/testing';
import { TestBed }                     from '@angular/core/testing/test_bed';
import { Component }                   from '@angular/core';

import { XLarge }                      from './x-large.directive';

describe('x-large directive', () => {

  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should sent font-size to x-large', async(inject([], () => {
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.children[0].style.fontSize).toBe('x-large');
    });
  })));

});

// Create a test component to test directives
@Component({
  template: '<div x-large>Content</div>',
  directives: [ XLarge ]
})
class TestComponent {}
