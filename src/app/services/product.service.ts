import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  showAllProduct(): Observable<any> {
    return this.http.get(environment.url_api + 'product/show-product', {headers: this.authService.setHeader()})
  }

  showProductNew(): Observable<any> {
    return this.http.get(environment.url_api + 'product/show-product-new', {headers: this.authService.setHeader()})
  }

  showProductView(): Observable<any> {
    return this.http.get(environment.url_api + 'product/show-product-view', {headers: this.authService.setHeader()})
  }

  showProductSell(): Observable<any> {
    return this.http.get(environment.url_api + 'product/show-product-sell', {headers: this.authService.setHeader()})
  }

  showProductById(id: any): Observable<any> {
    return this.http.post(environment.url_api + 'product/' + id + '/find-product', null, {headers: this.authService.setHeader()})
  }

  updateProduct(data: any, id: any): Observable<any> {
    return this.http.post(environment.url_api + 'product/' + id + '/update-product', data, {headers: this.authService.setHeader()})
  }

  delete(id: any): Observable<any> {
    return this.http.post(environment.url_api + 'product/' + id + '/delete-product', null, {headers: this.authService.setHeader()});
  }

  create(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'product/create-product', data, {headers: this.authService.setHeader()})
  }

  addToCart(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'product/add-cart-product', data, {headers: this.authService.setHeader()})
  }

  showCart(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'product/' + id + '/show-cart-product', {headers: this.authService.setHeader()})
  }

  updateToCart(data: any, id: any): Observable<any> {
    return this.http.post(environment.url_api + 'product/' + id + '/update-cart-product/' + data, null, {headers: this.authService.setHeader()})
  }

  addToCartDashboard(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'product/add-to-cart-dashboard', data, {headers: this.authService.setHeader()});
  }

  deleteCart(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'product/' + id + '/cart-product-delete', {headers: this.authService.setHeader()})
  }

  relatedProducts(id: any): Observable<any> {
    return this.http.get(environment.url_api + 'product/' + id + '/related-products', {headers: this.authService.setHeader()})
  }


}
