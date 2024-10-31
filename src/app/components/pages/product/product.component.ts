import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceService} from "../../../services/http-service.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: ProductType;
  loading:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpServiceService, private router: Router) {
    this.product = {
      description: '',
      id: 0,
      image: '',
      price: 0,
      title: '',
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.httpService.getProducts()
          .pipe(
            tap(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (data: ProductType[]) => {
              const product_find:ProductType | undefined = data.find(item => item.id === +params['id']);
              if (product_find) {
                this.product = product_find;
              }
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          })
      }

    })
  }
}



