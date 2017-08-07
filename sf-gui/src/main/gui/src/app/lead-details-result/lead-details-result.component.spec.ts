import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDetailsResultComponent } from './lead-details-result.component';

describe('LeadDetailsResultComponent', () => {
  let component: LeadDetailsResultComponent;
  let fixture: ComponentFixture<LeadDetailsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDetailsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDetailsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
