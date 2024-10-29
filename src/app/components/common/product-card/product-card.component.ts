import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
@Input() product!:ProductType;
  constructor() {

  }

  ngOnInit(): void {
    // console.log(this.product);
  }

}
