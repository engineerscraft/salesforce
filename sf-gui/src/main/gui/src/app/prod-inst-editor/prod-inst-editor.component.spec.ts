import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdInstEditorComponent } from './prod-inst-editor.component';

describe('ProdInstEditorComponent', () => {
  let component: ProdInstEditorComponent;
  let fixture: ComponentFixture<ProdInstEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdInstEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdInstEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
