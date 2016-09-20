import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { MdSidenavModule }              from '@angular2-material/sidenav/sidenav';
import { MdToolbarModule }              from '@angular2-material/toolbar/toolbar';
import { MdListModule }                 from '@angular2-material/list/list';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdButtonModule }               from '@angular2-material/button/button';
import { MdMenuModule }                 from '@angular2-material/menu/menu';

import { AppComponent }                 from './app.component';
import { AppState }                     from './app.service';
import { routing }                      from './app.routing';
import { appRoutingProviders }          from './app.routing';

import { AppointmentModule }            from './appointment/appointment.module';
import { HomeModule }                   from './home/home.module';
import { AboutComponent }               from './about/about.component';
import { NoContent }                    from './no-content';
import { XLarge }                       from './home/x-large';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AppointmentModule,
    HomeModule,
    MdSidenavModule,
    MdToolbarModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    MdMenuModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    NoContent,
    XLarge
  ],
  providers: [
    AppState,
    appRoutingProviders,
    MdIconRegistry
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
