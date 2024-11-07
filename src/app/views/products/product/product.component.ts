import {Component, OnInit} from '@angular/core';
import {ProductInterface} from "../../../../interfaces/product.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../../shared/services/http.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: ProductInterface;
  loading:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService, private router: Router) {
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
            next: (data: ProductInterface[]) => {
              const product_find:ProductInterface | undefined = data.find(item => item.id === +params['id']);
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



