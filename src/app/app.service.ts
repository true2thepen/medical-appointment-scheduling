import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Rx';

import * as moment    from 'moment';

declare var navigator: any; // navigator.languages not available yet

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: InternalStateType = { };

  /**
   * The title to be displayed.
   */
  public title: Subject<string> = new Subject<string>();

  /**
   * If the page to be displayed is a sub-page, setting this value to true will render a back arrow
   * instead of the menu button, and a click will trigger the browser to go back in history.
   */
  public isSubPage: Subject<boolean> = new Subject<boolean>();

  /**
   * Toolbar actions for the page
   */
  public actions: Subject<Action[]> = new Subject<Action[]>();

  /**
   * Primary actions of the page, displayed as fab.
   */
  public primaryAction: Subject<Action> = new Subject<Action>();

  /**
   * This sets the locale depending on the browser configuration.
   * The value is extracted from either `navigator.languages[0]`,
   * `navigator.language` or `navigator.userLanguage` and persisted to
   * localStorage, where all other parts of the application take it from.
   */
  public ensureLocale() {
    if (!localStorage.getItem('locale')) {
      let locale = navigator.languages
        ? navigator.languages[0]
        : (navigator.language || navigator.userLanguage);
      localStorage.setItem('locale', locale);
      this.setMomentLocale(locale);
    } else {
      this.setMomentLocale(localStorage.getItem('locale'));
    }
  }

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  /**
   * This sets the locale for all newly create moments globally.
   */
  private setMomentLocale(locale: string) {
    moment.locale(locale);
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}

export interface Action {
  icon: string;
  clickHandler?: Function;
  routerLink?: string;
}
