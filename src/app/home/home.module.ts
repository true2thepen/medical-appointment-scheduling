import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { HomeComponent } from './home.component';
import { homeRouting }   from './home.routing';

import { Title }         from './title/title.service';

@NgModule({
  imports: [
    CommonModule,
    homeRouting
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    Title
  ]
})
export class HomeModule {}
