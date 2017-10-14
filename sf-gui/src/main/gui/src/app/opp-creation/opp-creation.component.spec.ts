import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppCreationComponent } from './opp-creation.component';

describe('OppCreationComponent', () => {
  let component: OppCreationComponent;
  let fixture: ComponentFixture<OppCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
