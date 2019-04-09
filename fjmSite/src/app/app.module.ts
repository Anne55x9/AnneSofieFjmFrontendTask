
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{FormsModule} from '@angular/forms';
import{HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';


import { OrderModule } from 'ngx-order-pipe';
import { AboutFjmComponent } from './about-fjm/about-fjm.component';
import { JobsSubmittedComponent } from './jobs-submitted/jobs-submitted.component';
import { StatsJobsComponent } from './stats-jobs/stats-jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { AppRouterModule } from './app-router/app-routing.module';
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
