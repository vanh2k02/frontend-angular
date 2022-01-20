import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {ProductService} from "../../../../services/product.service";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  user: any;
  user_id = JSON.parse(<string>sessionStorage.getItem('user'));
  token = sessionStorage.getItem('token');
  product_count: any;
  products: any;

  constructor(private authService: AuthService,
              private route: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.showProfile();
    this.getCartProduct();
  }

  isLogin() {
    if (this.token) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.authService.logout().subscribe(res => {
      sessionStorage.clear();
      this.route.navigate(['login'])
    })
  }

  showProfile() {
    this.authService.showProfile().subscribe(res => {
      this.user = res;
    })
  }

  getCartProduct() {
    this.productService.showCart(this.user_id.id).subscribe(res => {
      this.products = res;
      this.product_count = res.length;
    });
  }

  totalCart() {
    let getTotal = 0;
    for (let i = 0; i < this.product_count; i++) {
      let total = this.products[i].quantity * this.products[i].price;
      getTotal += total;
    }
    return getTotal;
  }

}
