import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../../../services/payment.service";

@Component({
  selector: 'app-admin-history-detail',
  templateUrl: './admin-history-detail.component.html',
  styleUrls: ['./admin-history-detail.component.css']
})
export class AdminHistoryDetailComponent implements OnInit {
  order_detail_id = localStorage.getItem('order_detail')
  order_details: any

  constructor(private paymentService: PaymentService) {
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
}
