import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {finalize} from "rxjs/operators";
import {ProductService} from "../../../../services/product.service";
import {CategoryService} from "../../../../services/category.service";
import {BrandService} from "../../../../services/brand.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  categories: any;
  brands: any;
  formCreateProduct: FormGroup | any;
  uploadProgress$?: Observable<number>;
  message: any;
  constructor(private storage: AngularFireStorage, private fb: FormBuilder,
              private productService: ProductService,
              private route: Router,
              private location: Location,
              private categoryService: CategoryService,
              private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.formCreateProduct = this.fb.group({
      name: [''],
      image: [''],
      quantity: [''],
      desc: [''],
      price: [''],
      promotional_price: ['0'],
      brand_id: ['Brand Product'],
      category_id: ['Category Product']
    })

    this.showAllBrand();
    this.showAllCategory();
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
        this.formCreateProduct?.get('image')?.setValue(url);
      })))
    ).subscribe();
  }

  onSubmit() {
    this.productService.create(this.formCreateProduct.value).subscribe(res => {

      this.message = res.message;
      setTimeout(() => {
          this.route.navigate(['admin/product']);}
        , 2000);
    })
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
