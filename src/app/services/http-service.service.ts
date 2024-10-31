import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../types/product.type";
import {OrderType} from "../types/order.type";
import {API_URL, API_URL_ORDER} from "../shared/constants/constants";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(API_URL);
  }

  searchProducts(url:string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(url);
  }

  createOrder(data: OrderType) {
    return this.http.post<{success: boolean, message?: string}>(API_URL_ORDER, data);
  }


}
