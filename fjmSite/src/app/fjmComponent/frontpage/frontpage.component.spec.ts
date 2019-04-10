import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatsJobsComponent } from './../stats-jobs/stats-jobs.component';
import { AboutFjmComponent } from './../about-fjm/about-fjm.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FrontpageComponent } from './frontpage.component';


import { MockBackend } from '@angular/http/testing';
import { HttpClient } from '@angular/common/http';
import { Http, ConnectionBackend, RequestOptions, HttpModule, BaseRequestOptions, XHRBackend } from '@angular/http';

describe('FrontpageComponent', () => {
  let component: FrontpageComponent;
  let fixture: ComponentFixture<FrontpageComponent>;
 

  //// this test failed : TypeError: backend.createConnection is not a function. Need to test connection. 

   it(`should have as title 'Welcome - I am a supercomputer and I am here to help'`, async(() =>{
       fixture = TestBed.createComponent(FrontpageComponent);
       component = fixture.debugElement.componentInstance;
       expect(component.title).toEqual('Welcome - I am a supercomputer and I am here to help');
      
   }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontpageComponent, AboutFjmComponent, StatsJobsComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [FrontpageComponent,ConnectionBackend,Http,BaseRequestOptions,
        { provide: XHRBackend, useClass: MockBackend, HttpClient, deps: [MockBackend]}
        
        //{provide: HttpClient, deps: [MockBackend]},  
      ],
      imports: [HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
