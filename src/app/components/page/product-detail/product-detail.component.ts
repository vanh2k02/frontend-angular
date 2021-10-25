import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id = localStorage.getItem('product_id');
  user_id = JSON.parse(<string>sessionStorage.getItem('user'));
  product: any;
  formCart: FormGroup | any;
  brand_id = localStorage.getItem('brand_id');
  category_id = localStorage.getItem('category_id');
  products: any;
  id_category = sessionStorage.getItem('category_id');
  totalLength: any;
  page: number = 1;
  number = 3;
  message: any;

  constructor(private productService: ProductService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formCart = this.fb.group({
      product_id: [this.id],
      quantity: ['1'],
      user_id: [this.user_id.id]
    })
    this.showProductById();
    this.relatedProducts();
  }

  onSubmit() {
    this.productService.addToCart(this.formCart.value).subscribe(res => {

      this.message = res;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    })
  }

  showProductById() {
    this.productService.showProductById(this.id).subscribe(res => {
      this.product = res;
    })

  }

  getProductById(val: any) {
    localStorage.setItem('category_id', val);

  }

  getById(val: any) {
    localStorage.setItem('brand_id', val);

  }

  relatedProducts() {
    this.productService.relatedProducts(this.id_category).subscribe(res => {
      console.log(res);
      this.products = res;
    })
  }

  getProductId(val: any, id: any) {
    localStorage.setItem('product_id', val);
    sessionStorage.setItem('category_id', id);
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
}
