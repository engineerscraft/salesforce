import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ProductService {

  constructor(private httpService: HttpService) { }
  
    searchProducts(searchString, startPosition) {
      return this.httpService.callHttpGet("/resources/v1/product?searchString=" + searchString + "&startPosition=" + startPosition)
        .map(res => res.json())
    }
  }
