import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class HomeComponent {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.appState.isSubPage.next(false);
    this.appState.title.next('Home');
  }

  submitState(value) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

}
