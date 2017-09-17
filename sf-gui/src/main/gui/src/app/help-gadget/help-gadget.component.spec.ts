import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpGadgetComponent } from './help-gadget.component';

describe('HelpGadgetComponent', () => {
  let component: HelpGadgetComponent;
  let fixture: ComponentFixture<HelpGadgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpGadgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpGadgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
