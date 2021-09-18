import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  products: any;
  totalLength: any;
  page: number = 1;
  number = 2;
  searchVal: any;
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.showAllProduct();

  }

  showAllProduct() {
    this.productService.showAllProduct().subscribe(res => {
      this.products = res;
      this.searchVal=this.products;
      this.totalLength = res.length;
    })
  }

  findId(id: any) {
    localStorage.setItem('product_id', id);
  }

  delete(id: any) {
    this.productService.delete(id).subscribe(res => {
      this.showAllProduct();
    })
  }

  changePage(val: any) {
    this.number = val.target.value;
  }

  findAllKeyWord(key: any) {
    return this.products.filter((val: { product_name: any; }) => {
      return (val.product_name.toLowerCase().indexOf(key) != -1);
    })
  }

  searchAll(val: any) {
    let keyWord = val.target.value.toLowerCase();
    this.products = (keyWord) ? this.findAllKeyWord(keyWord) : this.searchVal;
    return this.findAllKeyWord(keyWord);
  }

}
