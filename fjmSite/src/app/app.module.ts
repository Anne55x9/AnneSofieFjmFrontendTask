import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{FormsModule} from '@angular/forms';
import{HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,

    DatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
