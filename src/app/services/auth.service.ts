import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'login', data);
  }

  register(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'register', data);
  }

  setHeader() {
    let token = sessionStorage.getItem('token');
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  showProfile(): Observable<any> {
    return this.http.get(environment.url_api + 'auth/user-profile', {headers: this.setHeader()});
  }

  logout(): Observable<any> {
    return this.http.post(environment.url_api + 'auth/logout', null, {headers: this.setHeader()})
  }

  edit(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'auth/edit-profile', data, {headers: this.setHeader()})
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'auth/change-password', data, {headers: this.setHeader()});
  }
}
