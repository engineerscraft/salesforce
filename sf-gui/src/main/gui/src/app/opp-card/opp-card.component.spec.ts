import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppCardComponent } from './opp-card.component';

describe('OppCardComponent', () => {
  let component: OppCardComponent;
  let fixture: ComponentFixture<OppCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
