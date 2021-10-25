import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user_id = JSON.parse(<string>sessionStorage.getItem('user'));
  products: any;
  totalLength: any;
  page: number = 1;
  number = 4;
  quantity = 1;
  newProducts: any
  viewProducts: any
  sellProducts: any

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.showProductNew();
    this.showProductView();
    this.showProductSell();
  }

  getAllProduct() {
    this.productService.showAllProduct().subscribe(res => {
      console.log(res)
      this.products = res;
      this.totalLength = res.length;
    })
  }

  changePage(val: any) {
    this.number = val.target.value;
  }

  showProductNew() {
    this.productService.showProductNew().subscribe(res => {
      console.log(res);
      this.newProducts = res;
    })
  }

  showProductView() {
    this.productService.showProductView().subscribe(res => {
      console.log(res);
      this.viewProducts = res;
    })
  }

  showProductSell() {
    this.productService.showProductSell().subscribe(res => {
      console.log(res);
      this.sellProducts = res;
    })
  }

  getProductById(val: any, id: any) {
    localStorage.setItem('product_id', val);
    sessionStorage.setItem('category_id', id);
  }

  addToCart(val: any) {
    let data = [];
    data.push(val)
    data.push(this.user_id.id)
    data.push(this.quantity)
    this.productService.addToCartDashboard(data).subscribe(res => {
      console.log(res);
    })
  }
}
