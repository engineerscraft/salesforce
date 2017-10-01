import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepSelectorComponent } from './salesrep-selector.component';

describe('SalesrepSelectorComponent', () => {
  let component: SalesrepSelectorComponent;
  let fixture: ComponentFixture<SalesrepSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
