import { Injectable } from '@angular/core';
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
}
