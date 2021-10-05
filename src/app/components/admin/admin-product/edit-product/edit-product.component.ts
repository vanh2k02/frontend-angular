import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BrandService} from "../../../../services/brand.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {finalize} from "rxjs/operators";
import {ProductService} from "../../../../services/product.service";
import {CategoryService} from "../../../../services/category.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id = localStorage.getItem('product_id');
  formEditProduct: FormGroup | any;
  product: any;
  categories: any;
  brands: any;
  uploadProgress$?: Observable<number>;
  constructor(private brandService: BrandService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private fb: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.productService.showProductById(this.id).subscribe(res => {
      this.product = res;
      console.log(res)
      this.formEditProduct = this.fb.group({
        name: [this.product.product_name],
        image: [this.product.image],
        desc: [this.product.desc],
        price: [this.product.price],
        quantity: [this.product.quantity],
        promotional_price: [this.product.promotional_price],
        brand_id: [this.product.brand_id],
        category_id: [this.product.category_id]
      })
    })

    this.showAllBrand();
    this.showAllCategory();
  }

  onSubmit() {
    this.productService.updateProduct(this.formEditProduct.value, this.id).subscribe(res => {
      this.route.navigate(['admin/product']);
    })
  }

  onFileSelectedImage(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `upfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    // @ts-ignore
    this.uploadProgress$ = this.storage.upload(filePath, file).percentageChanges();
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => (fileRef.getDownloadURL().subscribe(url => {
        this.formEditProduct?.get('image')?.setValue(url);
      })))
    ).subscribe();
  }

  back() {
    this.location.back();
  }

  showAllCategory() {
    this.categoryService.showAllCategory().subscribe(res => {
      this.categories = res;
    })
  }

  showAllBrand() {
    this.brandService.showAllBrand().subscribe(res => {
      this.brands = res;
    })
  }
}
