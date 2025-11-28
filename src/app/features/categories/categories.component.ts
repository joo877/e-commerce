import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../core/models/category.interface';
import { ProductCategoryService } from '../../core/services/category/product-category.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categoriesList: Category[] = [];

  private readonly productCategoryService = inject(ProductCategoryService);

  ngOnInit(): void {
    this.getPupularCategory();
  }

  getPupularCategory(): void {
    this.productCategoryService.getProductCategory().subscribe({
      next: (res) => {
        console.log(res);

        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
