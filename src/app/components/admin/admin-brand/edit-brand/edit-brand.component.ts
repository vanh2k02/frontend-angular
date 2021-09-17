import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {finalize} from "rxjs/operators";
import {BrandService} from "../../../../services/brand.service";

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  id = localStorage.getItem('brand_id');
  formEditBrand: FormGroup | any;
  brand: any;

  constructor(private brandService: BrandService,
              private storage: AngularFireStorage,
              private fb: FormBuilder, private route: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.brandService.showBrandById(this.id).subscribe(res => {
      console.log(res)
      this.brand = res;
      this.formEditBrand = this.fb.group({
        name: [this.brand.brand_name],
        image: [this.brand.brand_image],
        desc: [this.brand.brand_desc]
      })
    })

  }

  onSubmit() {
    this.brandService.updateBrand(this.formEditBrand.value, this.id).subscribe(res => {
      this.route.navigate(['admin/brand']);
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
        this.formEditBrand?.get('image')?.setValue(url);
        console.log(url)
      })))
    ).subscribe();
  }

  back() {
    this.location.back();
  }
}
