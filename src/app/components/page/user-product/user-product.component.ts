import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnInit {

  products: any;
  totalLength: any;
  page: number = 1;
  number = 8;
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

  findAllKeyWord(key: any) {
    return this.products.filter((val: { category_name: any; }) => {
      return (val.category_name.toLowerCase().indexOf(key) != -1);
    })
  }

  searchAll(val: any) {
    let keyWord = val.target.value.toLowerCase();
    this.products = (keyWord) ? this.findAllKeyWord(keyWord) : this.searchVal;
    return this.findAllKeyWord(keyWord);
  }

  getProductById(val: any) {
    localStorage.setItem('product_id', val);
  }
}
