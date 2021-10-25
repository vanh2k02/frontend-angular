import {Component, OnInit} from '@angular/core';
import {BrandService} from "../../../services/brand.service";

@Component({
  selector: 'app-brand-product',
  templateUrl: './brand-product.component.html',
  styleUrls: ['./brand-product.component.css']
})
export class BrandProductComponent implements OnInit {
  products: any;
  totalLength: any;
  page: number = 1;
  number = 8;
  searchVal: any;
  brand_id = localStorage.getItem('brand_id');
  brand: any;

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.showBrandById()
  }

  getAllProduct() {
    this.brandService.brandProduct(this.brand_id).subscribe(res => {
      this.products = res;
      this.searchVal = this.products;
      this.totalLength = res.length;
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

  getProductById(val: any,id:any) {
    localStorage.setItem('product_id', val);
    localStorage.removeItem('category_id');
    sessionStorage.setItem('category_id', id);
  }

  showBrandById() {
    this.brandService.showBrandById(this.brand_id).subscribe(res => {
      console.log(res);
      this.brand = res;
    })
  }

}
