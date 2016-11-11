import { Pipe, PipeTransform } from '@angular/core';

/**
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | fixTimeAgoToSince
 * Example:
 *   {{ vor 10 Minuten |  fixTimeAgoToSince}}
 *   formats to: seit 10 Minuten
 *
 *   {{ 10 minutes ago |  fixTimeAgoToSince}}
 *   formats to: since 10 minutes
 */
@Pipe({name: 'fixTimeAgoToSince'})
export class FixTimeAgoToSincePipe implements PipeTransform {

  private locale: string = localStorage.getItem('locale');

  transform(value: string): string {
    if (this.locale.startsWith('de')) {
      return value.replace('vor', 'seit');
    } else if (this.locale.startsWith('en')) {
      return 'since ' + value.replace('ago', '');
    }
  }

}

/**
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | fixTimeAgoToFor
 * Example:
 *   {{ vor 10 Minuten |  fixTimeAgoToFor}}
 *   formats to: 10 Minuten
 *
 *  {{ 10 minutes ago |  fixTimeAgoToFor}}
 *   formats to: for 10 minutes
 */
@Pipe({name: 'fixTimeAgoToFor'})
export class FixTimeAgoToForPipe implements PipeTransform {

  private locale: string = localStorage.getItem('locale');

  transform(value: string): string {
    if (this.locale.startsWith('de')) {
      return value.replace('vor', '');
    } else if (this.locale.startsWith('en')) {
      return 'for ' + value.replace('ago', '');
    }
  }

}

