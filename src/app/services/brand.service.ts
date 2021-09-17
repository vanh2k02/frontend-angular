import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  showAllBrand(): Observable<any> {
    return this.http.get(environment.url_api + 'brand/show-brand', {headers: this.authService.setHeader()})
  }

  showBrandById(id: any): Observable<any> {
    return this.http.post(environment.url_api + 'brand/' + id + '/find-brand', null, {headers: this.authService.setHeader()})
  }

  updateBrand(data: any, id: any): Observable<any> {
    return this.http.post(environment.url_api + 'brand/' + id + '/update-brand', data, {headers: this.authService.setHeader()})
  }

  delete(id: any): Observable<any> {
    return this.http.post(environment.url_api + 'brand/' + id + '/delete-brand', null, {headers: this.authService.setHeader()});
  }

  create(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'brand/create-brand', data, {headers: this.authService.setHeader()})
  }

}
