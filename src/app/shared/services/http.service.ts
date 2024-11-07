import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductInterface} from "../../../interfaces/product.interface";
import {OrderInterface} from "../../../interfaces/order.interface";
import {API_URL, API_URL_ORDER} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(API_URL);
  }

  searchProducts(url:string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(url);
  }

  createOrder(data: OrderInterface) {
    return this.http.post<{success: boolean, message?: string}>(API_URL_ORDER, data);
  }


}
