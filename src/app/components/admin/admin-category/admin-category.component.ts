import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";

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

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.showAllCategory();

  }

  showAllCategory() {
    this.categoryService.showAllCategory().subscribe(res => {
      this.categories = res;
      this.totalLength = res.length;
    })
  }

  findId(id: any) {
    localStorage.setItem('category_id', id);
  }

  delete(id: any) {
    this.categoryService.delete(id).subscribe(res => {
      console.log(res);
      this.showAllCategory();
    })
  }

  changePage(val: any) {
    this.number = val.target.value;
  }
}
