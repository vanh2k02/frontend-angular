import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../../services/category.service";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  id = localStorage.getItem('category_id');
  formEditCategory: FormGroup | any;
  category: any;

  constructor(private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private fb: FormBuilder, private route: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.categoryService.showCategoryById(this.id).subscribe(res => {
      this.category = res;
      this.formEditCategory = this.fb.group({
        name: [this.category.category_name],
        image: [this.category.category_image],
        desc: [this.category.category_desc]
      })
    })

  }

  onSubmit() {
    this.categoryService.updateCategory(this.formEditCategory.value, this.id).subscribe(res => {
      this.route.navigate(['admin/category']);
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
        this.formEditCategory?.get('image')?.setValue(url);
        console.log(url)
      })))
    ).subscribe();
  }

  back() {
    this.location.back();
  }
}
