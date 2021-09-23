import {Component, OnInit} from '@angular/core';
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

  constructor(private productService: ProductService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formCart = this.fb.group({
      product_id: [this.id],
      quantity: ['1'],
      user_id: [this.user_id.id]
    })
    this.showProductById();
  }

  onSubmit() {
    this.productService.addToCart(this.formCart.value).subscribe(res => {
      console.log(res);
    })
  }

  showProductById() {
    this.productService.showProductById(this.id).subscribe(res => {
      this.product = res;
    })
  }
}
