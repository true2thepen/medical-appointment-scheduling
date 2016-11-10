import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about';
import { NoContent } from './no-content';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/appointment/attendance', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: '**',    component: NoContent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
