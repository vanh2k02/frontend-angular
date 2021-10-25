import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {

  products: any;
  totalLength: any;
  page: number = 1;
  number = 8;
  searchVal: any;
  category_id = localStorage.getItem('category_id');
  category: any;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllProduct()
    this.showBrandById()
  }

  getAllProduct() {
    this.categoryService.categoryProduct(this.category_id).subscribe(res => {
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
    localStorage.removeItem('brand_id');
    localStorage.setItem('product_id', val);
    sessionStorage.setItem('category_id', id);
  }

  showBrandById() {
    this.categoryService.showCategoryById(this.category_id).subscribe(res => {
      console.log(res);
      this.category = res;
    })
  }
}
