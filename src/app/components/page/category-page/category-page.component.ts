import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  categories: any;
  totalLength: any;
  page: number = 1;
  number = 16;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.showAllCategory().subscribe(res => {
      this.categories = res;
      this.totalLength = res.length;
    })
  }

  getProductById(val: any) {
    localStorage.setItem('category_id', val);

  }
}
