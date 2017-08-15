import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsResultComponent } from './contact-details-result.component';

describe('ContactDetailsResultComponent', () => {
  let component: ContactDetailsResultComponent;
  let fixture: ComponentFixture<ContactDetailsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
