import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsSubmittedComponent } from './jobs-submitted.component';

describe('JobsSubmittedComponent', () => {
  let component: JobsSubmittedComponent;
  let fixture: ComponentFixture<JobsSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
