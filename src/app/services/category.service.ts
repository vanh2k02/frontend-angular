import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  showAllCategory(): Observable<any> {
    return this.http.get(environment.url_api + 'category/show-category', {headers: this.authService.setHeader()})
  }

  showCategoryById(id: any): Observable<any> {
    return this.http.post(environment.url_api + 'category/' + id + '/find-category', null, {headers: this.authService.setHeader()})
  }

  updateCategory(data: any, id: any): Observable<any> {
    return this.http.post(environment.url_api + 'category/' + id + '/update-category', data, {headers: this.authService.setHeader()})
  }

  delete(id: any): Observable<any> {
    return this.http.post(environment.url_api + 'category/' + id + '/delete-category', null, {headers: this.authService.setHeader()});
  }

  create(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'category/create-category', data, {headers: this.authService.setHeader()})
  }
}
