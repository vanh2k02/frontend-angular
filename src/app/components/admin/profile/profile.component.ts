import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.showProfile();
  }

  showProfile() {
    this.authService.showProfile().subscribe(res => {
      this.userProfile=res;
    })
  }
}
