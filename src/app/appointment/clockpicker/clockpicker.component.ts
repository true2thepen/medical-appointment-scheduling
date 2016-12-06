import { Component, ElementRef, OnDestroy, DoCheck,
  Input, Output, EventEmitter, IterableDiffers,
  AfterViewChecked, ViewChild, forwardRef }         from '@angular/core';
import { MdInput }                                  from '@angular/material';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,
  FormControl, NG_VALIDATORS }                      from '@angular/forms';

import * as ClockPicker                             from './clockpicker.js';
import * as moment                                  from 'moment';

export const CLOCKPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ClockPickerComponent),
  multi: true
};

export function validateTime(c: FormControl) {
  let time = moment(c.value, 'LT');
  if (time.isValid()) {
    return null;
  } else {
    let err = {
      timeError: {
        given: c.value,
        valid: time.isValid(),
        invalidAt: time.invalidAt()
      }
    };
    return err;
  }
};

export const CLOCKPICKER_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useValue: validateTime,
  multi: true
};

@Component({
  selector: 'clockpicker',
  providers: [CLOCKPICKER_VALUE_ACCESSOR, CLOCKPICKER_VALIDATORS],
  styleUrls: [ 'materialize.css', './clockpicker.scss' ],
  template: `<md-input #clockPicker
               [ngStyle]="style"
               [class]="styleClass"
               [placeholder]="placeholder"
               [required]="required"
               [disabled]="disabled"
               [(value)]="value"
               (keyup)="onKey($event)"
               (blur)="onBlur($event)">
                 <button md-suffix md-icon-button color="primary" (click)="show()" type=button>
                   <md-icon class="md-24">schedule</md-icon>
                 </button>
             </md-input>`
})
export class ClockPickerComponent implements AfterViewChecked, OnDestroy, ControlValueAccessor {

  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() disabled: boolean;
  @Input() twelveHours: boolean;
  @Input() autoClose: boolean;
  @Input() doneText: string;
  @ViewChild('clockPicker') private el: MdInput;
  private clockPicker: any;
  private _value: any = '';
  private input: HTMLInputElement;
  private initialized: boolean;

  constructor() {
    this.initialized = false;
  }

  public ngAfterViewChecked() {
    if (!this.initialized && this.el._inputElement.nativeElement.offsetParent) {
      this.initialize();
    }
  }

  public ngOnDestroy() {
    this.initialized = false;
  }

  public writeValue(value: any): void {
    this.value = value;

    if (this.input) {
      if (this.value === undefined || this.value === null) {
        this.input.value = '';
      }
    }
  }

  public registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  public setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  private onModelChange: Function = () => {};
  private onModelTouched: Function = () => {};

  get value(): any { return this._value; };
  @Input() set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onModelChange(v);
    }
  }

  private initialize() {
    this.input = this.el._inputElement.nativeElement;
    this.clockPicker = new ClockPicker(this.input, {
      'default': '',
      fromnow: 0,
      donetext: this.doneText ? this.doneText : 'Done',
      autoclose: this.autoClose,
      ampmclickable: false,
      darktheme: false,
      twelvehour: this.twelveHours,
      vibrate: true,
      afterDone: () => { this.afterClockPickerDone(); }
    });
    this.initialized = true;
  }

  private show() {
    this.clockPicker.show();
  }

  private afterClockPickerDone() {
    // Hotfix to notify md-input that its value has changed
    this.sanitizeApplyTime(this.input.value);
    this.input.value = this.value;
  }

  private onKey(event: Event) {
    this.value = (this.input.value);
  }

  private onBlur(event: Event) {
    this.sanitizeApplyTime(this.input.value);
  }

  private sanitizeApplyTime(value: any) {
    let time = moment(value, 'LT');
    if (time.isValid()) {
      this.value = time.format('LT');
    } else {
      this.value = value;
    }
  }

}
