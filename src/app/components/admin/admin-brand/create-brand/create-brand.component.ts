import { Component, OnInit } from '@angular/core';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {BrandService} from "../../../../services/brand.service";

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
  formCreateBrand: FormGroup | any;

  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private brandService: BrandService, private route: Router, private location: Location) { }

  ngOnInit(): void {
    this.formCreateBrand = this.fb.group({
      name: [''],
      image: [''],
      desc: ['']
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
        this.formCreateBrand?.get('image')?.setValue(url);
      })))
    ).subscribe();
  }

  onSubmit() {
    this.brandService.create(this.formCreateBrand.value).subscribe(res => {
      this.route.navigate(['admin/brand']);
    })
  }

  back() {
    this.location.back();
  }

}
