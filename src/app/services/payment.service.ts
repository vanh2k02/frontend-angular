import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  CreatePayment(data: any,val:any): Observable<any> {
    return this.http.post(environment.url_api + 'transport/'+val+'/create-transport', data, {headers: this.authService.setHeader()})
  }

  showPayment(): Observable<any> {
    return this.http.get(environment.url_api + 'transport/show-payment', {headers: this.authService.setHeader()});
  }
}
