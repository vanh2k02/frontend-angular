import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | any

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: Router) {
    this.formLogin = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.authService.login(this.formLogin.value).subscribe(res => {
      sessionStorage.setItem('token', res.access_token);
      sessionStorage.setItem('user', JSON.stringify(res.user));
      if (res.user.role_id == 0) {
        this.route.navigate(['']);
      } else {
        this.route.navigate(['admin']);
      }
    })
  }
}
