import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityCreationComponent } from './opportunity-creation.component';

describe('OpportunityCreationComponent', () => {
  let component: OpportunityCreationComponent;
  let fixture: ComponentFixture<OpportunityCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
