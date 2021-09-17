import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  user: any;
  token = sessionStorage.getItem('token');

  constructor(private authService: AuthService,
              private route: Router) {

  }

  ngOnInit(): void {
    this.showProfile();
  }

  isLogin() {
    if (this.token) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.authService.logout().subscribe(res => {
      sessionStorage.clear();
      this.route.navigate(['login'])
    })
  }

  showProfile() {
    this.authService.showProfile().subscribe(res => {
      this.user = res;
    })
  }
}
