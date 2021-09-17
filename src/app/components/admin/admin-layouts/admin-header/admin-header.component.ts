import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  user: any;
  role: any;

  constructor(private authService: AuthService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.showProfile()
  }

  logout() {
    this.authService.logout().subscribe(res => {
      console.log(res);
      sessionStorage.clear();
      this.route.navigate(['login'])
    })
  }

  showProfile() {
    this.authService.showProfile().subscribe(res => {
      this.user = res;
      console.log(res);
    })
  }

}
