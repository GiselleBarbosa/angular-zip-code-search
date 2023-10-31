import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFieldsComponent } from './feedback-fields.component';

describe('FeedbackFieldsComponent', () => {
  let component: FeedbackFieldsComponent;
  let fixture: ComponentFixture<FeedbackFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackFieldsComponent]
    });
    fixture = TestBed.createComponent(FeedbackFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
