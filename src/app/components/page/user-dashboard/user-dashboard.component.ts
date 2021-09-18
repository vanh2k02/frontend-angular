import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  products: any;
  totalLength: any;
  page: number = 1;
  number = 2;
  searchVal: any;
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.productService.showAllProduct().subscribe(res => {
      this.products = res;
      this.searchVal=this.products;
      this.totalLength = res.length;
    })
  }

  changePage(val: any) {
    this.number = val.target.value;
  }


}
