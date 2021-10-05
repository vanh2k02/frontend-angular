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
import {AdminProductComponent} from "./components/admin/admin-product/admin-product.component";
import {EditProductComponent} from "./components/admin/admin-product/edit-product/edit-product.component";
import {CreateProductComponent} from "./components/admin/admin-product/create-product/create-product.component";
import {ProductDetailComponent} from "./components/page/product-detail/product-detail.component";
import {UserProductComponent} from "./components/page/user-product/user-product.component";
import {ProductCartComponent} from "./components/page/product-cart/product-cart.component";
import {CheckOutComponent} from "./components/page/check-out/check-out.component";
import {CategoryPageComponent} from "./components/page/category-page/category-page.component";
import {BrandPageComponent} from "./components/page/brand-page/brand-page.component";
import {BrandProductComponent} from "./components/page/brand-product/brand-product.component";
import {CategoryProductComponent} from "./components/page/category-product/category-product.component";

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
      },
      {
        path: 'detail-product',
        component: ProductDetailComponent
      },
      {
        path: 'user-product',
        component: UserProductComponent
      },
      {
        path: 'cart-product',
        component: ProductCartComponent
      },
      {
        path: 'check-out',
        component: CheckOutComponent
      },
      {
        path: 'category-page',
        component: CategoryPageComponent
      },
      {
        path: 'brand-page',
        component: BrandPageComponent
      },
      {
        path: 'brand-product',
        component: BrandProductComponent
      },
      {
        path: 'category-product',
        component: CategoryProductComponent
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
      },
      {
        path: 'product',
        component: AdminProductComponent
      },
      {
        path: 'product/edit-product',
        component: EditProductComponent
      },
      {
        path: 'create-product',
        component: CreateProductComponent
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
