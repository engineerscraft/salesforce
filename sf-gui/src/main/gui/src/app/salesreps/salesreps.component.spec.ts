import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesrepsComponent } from './salesreps.component';

describe('SalesrepsComponent', () => {
  let component: SalesrepsComponent;
  let fixture: ComponentFixture<SalesrepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesrepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesrepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
