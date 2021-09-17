import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  formEdit: FormGroup | any;
  user:any
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private storage:AngularFireStorage,
              private route:Router) {

  }

  ngOnInit(): void {
    this.authService.showProfile().subscribe(res => {
      this.user=res;
      this.formEdit = this.fb.group({
        name: [this.user.name],
        address: [this.user.address],
        phone: [this.user.phone],
        password: [''],
        avatar:[this.user.image]
      })
    })

  }

  onSubmit() {
    this.authService.edit(this.formEdit.value).subscribe(res => {
      console.log(res);
      this.route.navigate(['admin/profile'])
    })
  }

  onFileSelectedImage(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `upfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    // @ts-ignore
    this.uploadProgress$ = this.storage.upload(filePath,file).percentageChanges();
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => (fileRef.getDownloadURL().subscribe(url => {
        this.formEdit?.get('avatar')?.setValue(url);
        console.log(url)
      })))
    ).subscribe();
  }
}
