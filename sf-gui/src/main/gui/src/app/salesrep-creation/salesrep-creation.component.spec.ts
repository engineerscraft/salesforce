import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepCreationComponent } from './salesrep-creation.component';

describe('SalesrepCreationComponent', () => {
  let component: SalesrepCreationComponent;
  let fixture: ComponentFixture<SalesrepCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
