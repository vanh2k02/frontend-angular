import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaymentService} from "../../../services/payment.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  checkOut: FormGroup | any;
  user_id = JSON.parse(<string>sessionStorage.getItem('user'));
  products: any;
  product_count: any;
  payments: any;

  constructor(private fb: FormBuilder, private paymentService: PaymentService, private productService: ProductService) {
    this.checkOut = this.fb.group({
      name: [''],
      phone: [''],
      address: [''],
      email: [''],
      payment_id: [''],
      user_id: [this.user_id.id]
    })
  }

  ngOnInit(): void {
    this.getCartProduct();
    this.showPayment();
  }

  onSubmit() {
    this.paymentService.CreatePayment(this.checkOut.value).subscribe(res => {
      console.log(res);
    })

  }

  getCartProduct() {
    this.productService.showCart(this.user_id.id).subscribe(res => {
      console.log(res)
      this.products = res;
      this.product_count = res.length;
    });
  }

  totalCart() {
    let getTotal = 0;
    for (let i = 0; i < this.product_count; i++) {
      if (this.products[i].promotional_price == 0) {
        let total = this.products[i].quantity * this.products[i].price;
        getTotal += total;
      } else {
        let total = this.products[i].quantity * this.products[i].promotional_price;
        getTotal += total;
      }

    }
    return getTotal;
  }

  showPayment() {
    this.paymentService.showPayment().subscribe(res => {
      this.payments = res;
    })
  }

}
