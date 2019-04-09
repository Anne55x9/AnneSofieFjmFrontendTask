import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsJobsComponent } from './stats-jobs.component';

describe('StatsJobsComponent', () => {
  let component: StatsJobsComponent;
  let fixture: ComponentFixture<StatsJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
