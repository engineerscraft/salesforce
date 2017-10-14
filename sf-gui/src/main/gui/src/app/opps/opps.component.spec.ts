import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppsComponent } from './opps.component';

describe('OppsComponent', () => {
  let component: OppsComponent;
  let fixture: ComponentFixture<OppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
