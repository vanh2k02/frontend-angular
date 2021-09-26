import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: any;
  totalLength: any;
  page: number = 1;
  number = 2;
  searchVal: any;
  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.showAllCategory();

  }

  showAllCategory() {
    this.categoryService.showAllCategory().subscribe(res => {
      this.categories = res;
      this.searchVal=this.categories;
      this.totalLength = res.length;
    })
  }

  findId(id: any) {
    localStorage.setItem('category_id', id);
  }

  delete(id: any) {
    this.categoryService.delete(id).subscribe(res => {
      this.showAllCategory();
    })
  }

  changePage(val: any) {
    this.number = val.target.value;
  }

  findAllKeyWord(key: any) {
    return this.categories.filter((val: { category_name: any; }) => {
      return (val.category_name.toLowerCase().indexOf(key) != -1);
    })
  }

  searchAll(val: any) {
    let keyWord = val.target.value.toLowerCase();
    this.categories = (keyWord) ? this.findAllKeyWord(keyWord) : this.searchVal;
    return this.findAllKeyWord(keyWord);
  }

}
