import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppFormComponent } from './opp-form.component';

describe('OppFormComponent', () => {
  let component: OppFormComponent;
  let fixture: ComponentFixture<OppFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
