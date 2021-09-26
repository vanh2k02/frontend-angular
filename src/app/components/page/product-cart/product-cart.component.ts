import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  products: any;
  product_count: any;
  user_id = JSON.parse(<string>sessionStorage.getItem('user'));

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getCartProduct()
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

}
