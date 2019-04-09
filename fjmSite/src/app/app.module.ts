
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

import { AboutFjmComponent } from './about-fjm/about-fjm.component';
import { JobsSubmittedComponent } from './jobs-submitted/jobs-submitted.component';
import { StatsJobsComponent } from './stats-jobs/stats-jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { FrontpageComponent } from './frontpage/frontpage.component';

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
    AppRouterModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
