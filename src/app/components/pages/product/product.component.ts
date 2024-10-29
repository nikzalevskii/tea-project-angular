import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceService} from "../../../services/http-service.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: ProductType;

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
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      if (params['id']) {
        this.httpService.getProducts()
          .subscribe({
            next: (data) => {
              console.log(+params['id']);
              const product_find = data.find(item => item.id === +params['id']);
              if (product_find) {
                this.product = product_find;
                console.log(this.product);
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




// this.activatedRoute.params.subscribe((params) => {
//   if (params['id']) {
//     this.httpService.getProduct(+params['id'])
//       .subscribe({
//         next: (data) => {
//           console.log(data);
//           this.product = data;
//         },
//         error: (error) => {
//           this.router.navigate(['/']);
//         }
//       })
//   }
// })

