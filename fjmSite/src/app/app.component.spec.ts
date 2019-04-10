import { AboutFjmComponent } from './fjmComponent/about-fjm/about-fjm.component';
import { JobDetailComponent } from './fjmComponent/job-detail/job-detail.component';
import { JobsSubmittedComponent } from './fjmComponent/jobs-submitted/jobs-submitted.component';
import { FrontpageComponent } from './fjmComponent/frontpage/frontpage.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router/app-routing.module';
import { StatsJobsComponent } from './fjmComponent/stats-jobs/stats-jobs.component';
import { OrderModule } from 'ngx-order-pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FrontpageComponent,
        JobsSubmittedComponent,
        JobDetailComponent,
        AboutFjmComponent,
        StatsJobsComponent

      ],
      imports:[ AppRouterModule, OrderModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers:[{provide: APP_BASE_HREF, useValue: '/my/app'}]
    }).compileComponents();
  }));
 

  //// Test to verify if the text computerome just rigth of the logo is equal to computerome. ng test - Success.
   it(`should have as title 'Computerome'`, async(() => {
     const fixture = TestBed.createComponent(AppComponent);
     const app = fixture.debugElement.componentInstance;
     expect(app.title).toEqual('Computerome');
   }));


});
