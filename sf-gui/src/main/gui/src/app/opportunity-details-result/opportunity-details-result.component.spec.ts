import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityDetailsResultComponent } from './opportunity-details-result.component';

describe('OpportunityDetailsResultComponent', () => {
  let component: OpportunityDetailsResultComponent;
  let fixture: ComponentFixture<OpportunityDetailsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityDetailsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityDetailsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
