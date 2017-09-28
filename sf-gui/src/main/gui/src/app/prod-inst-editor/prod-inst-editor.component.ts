import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prod-inst-editor',
  templateUrl: './prod-inst-editor.component.html',
  styleUrls: ['./prod-inst-editor.component.scss']
})
export class ProdInstEditorComponent implements OnInit {

  @Output() add = new EventEmitter<any>();
  @Input() productInstance;

  private productInstanceFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productInstanceFormGroup = this.formBuilder.group({
      pubKey: [this.productInstance.pubKey, [Validators.required]],
      des: [this.productInstance.des, [Validators.required]],
      quotePrice: [this.productInstance.quotePrice, [Validators.required]],
      actualUnitPrice: [this.productInstance.actualUnitPrice, [Validators.required]],
      discType: [this.productInstance.discType, [Validators.required]],
      discVal: [this.productInstance.discVal, [Validators.required]],
      quoteUnitPrice: [this.productInstance.quoteUnitPrice, [Validators.required]],
      unit: [this.productInstance.unit, [Validators.required]]
    });
  }

}
