import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFjmComponent } from './about-fjm.component';

describe('AboutFjmComponent', () => {
  let component: AboutFjmComponent;
  let fixture: ComponentFixture<AboutFjmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutFjmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFjmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
