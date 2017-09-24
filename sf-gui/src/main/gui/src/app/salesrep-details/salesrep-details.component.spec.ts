import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepDetailsComponent } from './salesrep-details.component';

describe('SalesrepDetailsComponent', () => {
  let component: SalesrepDetailsComponent;
  let fixture: ComponentFixture<SalesrepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
