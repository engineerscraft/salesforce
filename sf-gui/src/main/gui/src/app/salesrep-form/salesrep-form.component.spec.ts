import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepFormComponent } from './salesrep-form.component';

describe('SalesrepFormComponent', () => {
  let component: SalesrepFormComponent;
  let fixture: ComponentFixture<SalesrepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
