import { Component, OnInit } from '@angular/core';
import {BrandService} from "../../../services/brand.service";

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.css']
})
export class AdminBrandComponent implements OnInit {
  brands: any;
  totalLength: any;
  page: number = 1;
  number = 2;

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.showAllBrand();

  }

  showAllBrand() {
    this.brandService.showAllBrand().subscribe(res => {
      this.brands = res;
      this.totalLength = res.length;
    })
  }

  findId(id: any) {
    localStorage.setItem('brand_id', id);
  }

  delete(id: any) {
    this.brandService.delete(id).subscribe(res => {
      console.log(res);
      this.showAllBrand();
    })
  }

  changePage(val: any) {
    this.number = val.target.value;
  }
}
