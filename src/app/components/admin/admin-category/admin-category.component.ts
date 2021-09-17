import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: any;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.showAllCategory();

  }

  showAllCategory() {
    this.categoryService.showAllCategory().subscribe(res => {
      this.categories = res;
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

}
