import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpServiceService} from "../../../services/http-service.service";
import {Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products:ProductType[] = [];
  productSubscription: Subscription | null = null;
  constructor(private httpService:HttpServiceService, private router: Router) { }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();

  }

  ngOnInit(): void {
    this.productSubscription = this.httpService.getProducts()
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            // console.log(data);
          },
          error:(error) => {
            this.router.navigate(['/']);
          }
        }
      )
  }

}
