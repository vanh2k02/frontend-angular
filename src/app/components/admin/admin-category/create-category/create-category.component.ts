import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  formCreateCategory: FormGroup | any;

  constructor(private storage: AngularFireStorage, private fb: FormBuilder, private categoryService: CategoryService,private route:Router) {
  }

  ngOnInit(): void {
    this.formCreateCategory = this.fb.group({
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
        this.formCreateCategory?.get('image')?.setValue(url);
      })))
    ).subscribe();
  }

  onSubmit() {
    this.categoryService.create(this.formCreateCategory.value).subscribe(res => {
      this.route.navigate(['admin/category']);
    })
  }

}
