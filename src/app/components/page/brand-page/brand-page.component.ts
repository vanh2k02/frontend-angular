import {Component, OnInit} from '@angular/core';
import {BrandService} from "../../../services/brand.service";

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.css']
})
export class BrandPageComponent implements OnInit {
  brands: any;
  totalLength: any;
  page: number = 1;
  number = 16;
  searchVal: any;

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getAllBrand();
  }

  getAllBrand() {
    this.brandService.showAllBrand().subscribe(res => {
      this.brands = res;
      this.searchVal=this.brands;
      this.totalLength = res.length;
    })
  }

  getProductById(val: any) {
    localStorage.setItem('brand_id', val);
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
