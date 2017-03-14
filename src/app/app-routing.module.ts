import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';

import { AboutComponent }     from './about/about.component';
import { NoContentComponent } from './no-content/no-content.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/appointment/attendance', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: '**',    component: NoContentComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
