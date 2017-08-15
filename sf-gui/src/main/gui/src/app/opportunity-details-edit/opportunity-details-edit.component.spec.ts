import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityDetailsEditComponent } from './opportunity-details-edit.component';

describe('OpportunityDetailsEditComponent', () => {
  let component: OpportunityDetailsEditComponent;
  let fixture: ComponentFixture<OpportunityDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
