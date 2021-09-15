import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup | any

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route:Router) {
    this.formRegister = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.formRegister.value).subscribe(res => {
    this.route.navigate(['login'])
    })
  }
}
