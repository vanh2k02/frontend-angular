import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserMasterComponent} from "./components/page/user-layouts/user-master/user-master.component";
import {UserDashboardComponent} from "./components/page/user-dashboard/user-dashboard.component";
import {AdminMasterComponent} from "./components/admin/admin-layouts/admin-master/admin-master.component";
import {AdminDashboardComponent} from "./components/admin/admin-dashboard/admin-dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/admin/profile/profile.component";
import {EditProfileComponent} from "./components/admin/profile/edit-profile/edit-profile.component";
import {ProfileUserComponent} from "./components/page/profile-user/profile-user.component";
import {AuthGuard} from "./guard/auth.guard";
import {AdminCategoryComponent} from "./components/admin/admin-category/admin-category.component";
import {AdminBrandComponent} from "./components/admin/admin-brand/admin-brand.component";
import {EditCategoryComponent} from "./components/admin/admin-category/edit-category/edit-category.component";
import {CreateCategoryComponent} from "./components/admin/admin-category/create-category/create-category.component";
import {EditBrandComponent} from "./components/admin/admin-brand/edit-brand/edit-brand.component";
import {CreateBrandComponent} from "./components/admin/admin-brand/create-brand/create-brand.component";

const routes: Routes = [
  {
    path: '',
    component: UserMasterComponent,
    children: [
      {
        path: '',
        component: UserDashboardComponent
      },
      {
        path: 'profile',
        component: ProfileUserComponent
      }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminMasterComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'profile/edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'category',
        component: AdminCategoryComponent
      },
      {
        path: 'category/edit-category',
        component: EditCategoryComponent
      },
      {
        path: 'create-category',
        component: CreateCategoryComponent
      },
      {
        path: 'brand',
        component: AdminBrandComponent
      },
      {
        path: 'brand/edit-brand',
        component: EditBrandComponent
      },
      {
        path: 'create-brand',
        component: CreateBrandComponent
      }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
