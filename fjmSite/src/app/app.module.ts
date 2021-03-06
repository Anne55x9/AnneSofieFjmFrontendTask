//The imported Service that is NOT fully implemented.
import { HttpService } from './fjmComponent/http.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//Enables http transport between server and client using the provided fjm backend service. 

import{FormsModule} from '@angular/forms';
import{HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

//Enables Orderby function in list of jobs submitted.

import { OrderModule } from 'ngx-order-pipe';

//Enables navigation on website.

import { AppRouterModule } from './app-router/app-routing.module';

//Component in the application. 

import { AboutFjmComponent } from './fjmComponent/about-fjm/about-fjm.component';
import { JobsSubmittedComponent } from './fjmComponent/jobs-submitted/jobs-submitted.component';
import { StatsJobsComponent } from './fjmComponent/stats-jobs/stats-jobs.component';
import { JobDetailComponent } from './fjmComponent/job-detail/job-detail.component';
import { FrontpageComponent } from './fjmComponent/frontpage/frontpage.component';

//Modules for mock up ngx chart

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AboutFjmComponent,
    JobsSubmittedComponent,
    StatsJobsComponent,
    JobDetailComponent,
    FrontpageComponent,
   
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    OrderModule,
    AppRouterModule,
    BrowserAnimationsModule, 
    NgxChartsModule
    
  ],
  providers: [HttpService,],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
