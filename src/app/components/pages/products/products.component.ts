import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription, tap} from "rxjs";
import {HttpServiceService} from "../../../services/http-service.service";
import {Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  loading:boolean = false;
  public products:ProductType[] = [];
  productSubscription: Subscription | null = null;
  public title: string = 'Наши чайные коллекции';
  searchSubscription: Subscription | null = null;
  notFound:boolean = false;
  constructor(private httpService:HttpServiceService, private router: Router, private searchService:SearchService) { }

  ngOnDestroy() {
    this.searchService.clearSearchQuery();
    this.searchSubscription?.unsubscribe();

  }

  ngOnInit(): void {
    this.loading = true;
    this.notFound = false;
    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.fetchProducts(query);
      this.updateTitle(query);
    });
  }

  fetchProducts(query:string) {
    this.loading = true;
    let apiUrl = 'https://testologia.ru/tea';
    if (query) {
      apiUrl += `?search=${query}`;
    }
    this.productSubscription = this.httpService.searchProducts(apiUrl)
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            if (!this.products.length) {
              this.notFound = true;
            }
            console.log(data);
          },
          error:(error) => {
            this.router.navigate(['/']);
          }
        }
      )
  }

  updateTitle(query:string) {
    this.title = query ? `Результаты поиска по запросу "${query}"` : 'Наши чайные коллекции';
  }



    // this.productSubscription = this.httpService.getProducts()
    //   .pipe(
    //     tap(() => {
    //       this.loading = false;
    //     })
    //   )
    //   .subscribe(
    //     {
    //       next: (data) => {
    //         this.products = data;
    //         // console.log(data);
    //       },
    //       error:(error) => {
    //         this.router.navigate(['/']);
    //       }
    //     }
    //   )


}
