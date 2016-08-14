import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { MdSidenavModule }     from '@angular2-material/sidenav/sidenav';
import { MdToolbarModule }     from '@angular2-material/toolbar/toolbar';
import { MdListModule }        from '@angular2-material/list/list';
import { MdIconModule }        from '@angular2-material/icon/icon';
import { MdButtonModule }      from '@angular2-material/button/button';

import { AppComponent }        from './app.component';
import { AppState }            from './app.service';
import { routing }             from './app.routing';
import { appRoutingProviders } from './app.routing';

import { AppointmentModule }   from './appointment/appointment.module';
import { HomeModule }          from './home/home.module';

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
    MdButtonModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppState,
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
