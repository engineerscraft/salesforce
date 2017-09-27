import { Component, OnInit, trigger, transition, style, animate, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(-50%)', opacity: 0 }))
      ])
    ]),
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-50%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateY(-50%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ProductSelectorComponent implements OnInit {
  private productSearchFormGroup: FormGroup;
  private searchString;
  private products;
  private start = 0
  private pageSize = 6;
  private paginationMessage;
  private message = '';


  @Output() add = new EventEmitter<any>();
  @Input() addedProducts;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit() {
    this.productSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.productSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.products = undefined;
        } else {
          this.searchString = res;
          this.productService.searchProducts(this.searchString, 0)
            .subscribe(
            data => {
              this.products = data;
              this.products.forEach(function (prod) {
                this.addedProducts.forEach(function (addedProd) {
                  if (prod.pubKey === addedProd.pubKey) {
                    prod.alreadyAdded = true;
                  }
                }.bind(this))
              }.bind(this));
            },
            err => {

            });
        }
      });
  }

  addProduct(product) {
    this.add.emit({
      "pubKey": product.pubKey,
      "des": product.des,
      "price": product.price
    });
    this.products.forEach(function (prod) {
      if (product.pubKey === prod.pubKey) {
        prod.alreadyAdded = true;
      }
    });
  }

  next() {
    this.start = this.start + this.pageSize;
    this.productService.searchProducts(this.searchString, this.start)
      .subscribe(
      data => {
        this.message = '';
        this.products = data;
        this.paginationMessage = undefined;
        this.products.forEach(function (prod) {
          this.addedProducts.forEach(function (addedProd) {
            if (prod.pubKey === addedProd.pubKey) {
              prod.alreadyAdded = true;
            }
          }.bind(this))
        }.bind(this));

      },
      err => {
        this.start = this.start - this.pageSize;
        if (err.status === 404) {
          this.paginationMessage = "You are on the last page";
          setTimeout(
            function () {
              console.log(this.paginationMessage);
              this.paginationMessage = undefined;
            }.bind(this), 2000);
        }
      });
  }

  previous() {
    if (this.start === 0) {
      this.paginationMessage = "You are on the first page";
      setTimeout(
        function () {
          this.paginationMessage = undefined;
        }.bind(this), 2000);
    } else {
      this.start = this.start - this.pageSize;
      this.productService.searchProducts(this.searchString, this.start)
        .subscribe(
        data => {
          this.products = data;
          this.message = '';
          this.paginationMessage = undefined;
          this.products.forEach(function (prod) {
            this.addedProducts.forEach(function (addedProd) {
              if (prod.pubKey === addedProd.pubKey) {
                prod.alreadyAdded = true;
              }
            }.bind(this))
          }.bind(this));
        },
        err => {
          this.start = this.start + this.pageSize;
        });
    }
  }
}
