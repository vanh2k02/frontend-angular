import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../../services/payment.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  orders: any;
  totalLength: any;
  page: number = 1;
  number = 10;
  searchVal: any;

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.showOrder()
  }

  showOrder() {
    this.paymentService.showOrder().subscribe(res => {
      this.orders = res;
      this.totalLength = res.length;
      this.searchVal = this.orders;
    })
  }

  changePage(val: any) {
    this.number = val.target.value;
  }

  findAllKeyWord(key: any) {
    return this.orders.filter((val: { name: any; }) => {
      return (val.name.toLowerCase().indexOf(key) != -1);
    })
  }

  searchAll(val: any) {
    let keyWord = val.target.value.toLowerCase();
    this.orders = (keyWord) ? this.findAllKeyWord(keyWord) : this.searchVal;
    return this.findAllKeyWord(keyWord);
  }

  findById(val: any) {
    localStorage.setItem('order_detail', val);
  }
}
