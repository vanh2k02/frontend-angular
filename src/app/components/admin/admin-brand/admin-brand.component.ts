import {Component, OnInit} from '@angular/core';
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
  searchVal: any;

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.showAllBrand();

  }

  showAllBrand() {
    this.brandService.showAllBrand().subscribe(res => {
      this.brands = res;
      this.totalLength = res.length;
      this.searchVal = this.brands;
    })
  }

  findId(id: any) {
    localStorage.setItem('brand_id', id);
  }

  delete(id: any) {
    this.brandService.delete(id).subscribe(res => {
      this.showAllBrand();
    })
  }

  changePage(val: any) {
    this.number = val.target.value;
  }

  findAllKeyWord(key: any) {
    return this.brands.filter((val: { brand_name: any; }) => {
      return (val.brand_name.toLowerCase().indexOf(key) != -1);
    })
  }

  searchAll(val: any) {
    let keyWord = val.target.value.toLowerCase();
    this.brands = (keyWord) ? this.findAllKeyWord(keyWord) : this.searchVal;
    return this.findAllKeyWord(keyWord);
  }

}
