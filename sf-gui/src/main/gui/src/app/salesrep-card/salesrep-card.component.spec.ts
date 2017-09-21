import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepCardComponent } from './salesrep-card.component';

describe('SalesrepCardComponent', () => {
  let component: SalesrepCardComponent;
  let fixture: ComponentFixture<SalesrepCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
