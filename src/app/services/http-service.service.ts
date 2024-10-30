import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../types/product.type";
import {OrderType} from "../types/order.type";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }

  searchProducts(url:string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(url);
  }

  createOrder(data: OrderType) {
    return this.http.post<{success: boolean, message?: string}>('https://testologia.ru/order-tea', data);
  }


}
