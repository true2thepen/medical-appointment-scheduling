import { Component, ElementRef, OnDestroy, DoCheck,
  Input, Output, EventEmitter, IterableDiffers,
  AfterViewChecked, ViewChild, forwardRef }         from '@angular/core';
import { MdInputContainer }                         from '@angular/material';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,
  FormControl, NG_VALIDATORS }                      from '@angular/forms';

import * as DatePicker                              from './picker.date';
import * as Picker                                  from './picker';
import * as moment                                  from 'moment';

export const DATEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

export function validateDate(c: FormControl) {
  let date = moment(c.value, 'l');
  if (date.isValid()) {
    return null;
  } else {
    let err = {
      dateError: {
        given: c.value,
        valid: date.isValid(),
        invalidAt: date.invalidAt()
      }
    };
    return err;
  }
};

export const DATEPICKER_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useValue: validateDate,
  multi: true
};

@Component({
  selector: 'datepicker',
  providers: [DATEPICKER_VALUE_ACCESSOR, DATEPICKER_VALIDATORS],
  styleUrls: [ 'materialize.css', './datepicker.scss' ],
  template: `
            <md-input-container #datePicker>
              <input mdInput
               [ngStyle]="style"
               [class]="styleClass"
               [placeholder]="placeholder"
               [required]="required"
               [disabled]="disabled"
               [(value)]="value"
               (keyup)="onKey($event)"
               (blur)="onBlur($event)">
                <button md-suffix md-icon-button color="primary"
                             (click)="show()" type=button tabindex="-1">
                  <md-icon class="md-24">today</md-icon>
                </button>
            </md-input-container>`
})
export class DatePickerComponent implements AfterViewChecked, OnDestroy, ControlValueAccessor {

  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() style: any;
  @Input() disabled: boolean;
  @Input() styleClass: string;
  @Input() dateFormat: string;
  @ViewChild('datePicker') private el: MdInputContainer;
  private datePicker: any;
  private _value: any = '';
  private input: HTMLInputElement;
  private initialized: boolean;

  constructor() {
    this.initialized = false;
  }

  public ngAfterViewChecked() {
    if (!this.initialized && this.el._mdInputChild/*.nativeElement.offsetParent*/) {
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

    this.datePicker = new Picker($(this.input), 'pickadate', DatePicker, {
      format: this.dateFormat ? this.dateFormat : 'm/d/yyyy',
      formatSubmit: this.dateFormat ? this.dateFormat : 'm/d/yyyy'
    });

    // Anytime before open, update value from input
    this.datePicker.on('open', () => {
      this.datePicker.set('select', moment(this.input.value, 'l').valueOf(), { muted: true });
    });

    this.initialized = true;
  }

  private show() {
    this.datePicker.open();
  }

  private onKey(event: Event) {
    this.value = (this.input.value);
  }

  private onBlur(event: Event) {
    this.sanitizeApplyDate(this.input.value);
  }

  private sanitizeApplyDate(value: any) {
    let time = moment(value, 'l');
    if (time.isValid()) {
      this.value = time.format('l');
    } else {
      this.value = value;
    }
  }

}
