import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAddCourseComponent } from './candidate-add-course.component';

describe('AboutUsComponent', () => {
  let component: CandidateAddCourseComponent;
  let fixture: ComponentFixture<CandidateAddCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAddCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
