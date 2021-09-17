import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.component.html',
  styleUrls: ['./admin-master.component.css']
})
export class AdminMasterComponent implements OnInit {

  user: any;
  role: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.showProfile();
  }

  showProfile() {
    this.authService.showProfile().subscribe(res => {
      this.user = res;
      console.log(res);
    })
  }

  checkRole() {
    if (this.user.role_id == 0) {
      return this.role = false;
    } else {
      return this.role = true;
    }
  }
}
