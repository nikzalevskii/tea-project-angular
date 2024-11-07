import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from "../../../../interfaces/product.interface";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {
@Input() product!:ProductInterface;
  constructor() {

  }


}
