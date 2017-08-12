import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsResultComponent } from './account-details-result.component';

describe('AccountDetailsResultComponent', () => {
  let component: AccountDetailsResultComponent;
  let fixture: ComponentFixture<AccountDetailsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
