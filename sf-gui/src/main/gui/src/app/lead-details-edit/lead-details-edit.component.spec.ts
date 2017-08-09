import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDetailsEditComponent } from './lead-details-edit.component';

describe('LeadDetailsEditComponent', () => {
  let component: LeadDetailsEditComponent;
  let fixture: ComponentFixture<LeadDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
