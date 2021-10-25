import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../../services/payment.service";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order_detail_id = localStorage.getItem('order_detail')
  order_details: any
  message: any;

  constructor(private paymentService: PaymentService,private route:Router) {
  }

  ngOnInit(): void {
    this.showOrderDetail();
  }

  showOrderDetail() {
    this.paymentService.showOrderDetail(this.order_detail_id).subscribe(res => {
      console.log(res);
      this.order_details = res;
    })
  }

  history(val: any) {
    this.paymentService.history(val).subscribe(res => {
      this.message = res;
      setTimeout(() => {
          this.route.navigate(['admin']);
        }
        , 2000);
    })
  }

}
