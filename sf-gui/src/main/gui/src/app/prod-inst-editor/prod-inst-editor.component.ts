import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prod-inst-editor',
  templateUrl: './prod-inst-editor.component.html',
  styleUrls: ['./prod-inst-editor.component.scss']
})
export class ProdInstEditorComponent implements OnInit {

  @Output() save = new EventEmitter<any>();
  @Input() productInstance;

  private productInstanceFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productInstanceFormGroup = this.formBuilder.group({
      pubKey: [this.productInstance.pubKey, [Validators.required]],
      des: [this.productInstance.des, [Validators.required]],
      quotePrice: [this.productInstance.quotePrice, [Validators.required]],
      actualPrice: [this.productInstance.actualPrice, [Validators.required]],
      discType: [this.productInstance.discType, [Validators.required]],
      discVal: [this.productInstance.discVal, [Validators.required]],
      totalQuotePrice: [this.productInstance.totalQuotePrice, [Validators.required]],
      unit: [this.productInstance.unit, [Validators.required]]
    });

    this.productInstanceFormGroup.get("discType").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        this.calculate();
      });
    this.productInstanceFormGroup.get("discVal").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        this.calculate();
      });
    this.productInstanceFormGroup.get("quotePrice").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        this.calculate();
      });
    this.productInstanceFormGroup.get("unit").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        this.calculate();
      });
  }



  submit() {
    this.calculate();
    this.save.emit(this.productInstance);
  }

  calculate() {
    this.productInstance = this.productInstanceFormGroup.value;
    if (this.productInstance.discType === 1) {
      this.productInstance.quotePrice = this.productInstance.actualPrice - this.productInstance.discVal;
      this.productInstance.discUnit = '';
    } else {
      this.productInstance.quotePrice = this.productInstance.actualPrice - (this.productInstance.discVal * this.productInstance.actualPrice) / 100;
      this.productInstance.discUnit = '%';
    }
    this.productInstance.totalQuotePrice = this.productInstance.quotePrice * this.productInstance.unit;

    this.productInstanceFormGroup.patchValue({
      quotePrice: this.productInstance.quotePrice,
      totalQuotePrice: this.productInstance.totalQuotePrice,
      discUnit: this.productInstance.discUnit,
      discType: this.productInstance.discType
    });

  }
}
