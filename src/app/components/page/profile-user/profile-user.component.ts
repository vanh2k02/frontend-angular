import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  uploadProgress$: Observable<number> | undefined;
  userProfile: FormGroup | any;
  user: any;
  changePassword: FormGroup | any;

  constructor(private authService: AuthService, private fb: FormBuilder,
              private storage: AngularFireStorage,
              private route: Router) {
  }

  ngOnInit(): void {

    this.authService.showProfile().subscribe(res => {
      this.user = res;
      this.userProfile = this.fb.group({
        name: [this.user.name],
        address: [this.user.address],
        phone: [this.user.phone],
        password: [''],
        avatar: [this.user.image]
      })
    })

    this.changePassword = this.fb.group({
      old_password: [''],
      new_password: [''],
      new_password_confirmation: ['']
    })

  }

  onSubmit() {
    this.authService.edit(this.userProfile.value).subscribe(res => {
      console.log(res);
      this.route.navigate([''])
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
        this.userProfile?.get('avatar')?.setValue(url);
        console.log(url)
      })))
    ).subscribe();
  }

  change() {
    this.authService.changePassword(this.changePassword.value).subscribe(res => {
      console.log(res);
    })
  }

}
