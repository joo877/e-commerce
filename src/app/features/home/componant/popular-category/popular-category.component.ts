import { Component, inject, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../../../core/services/category/product-category.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../../core/models/category.interface';

@Component({
  selector: 'app-popular-category',
  imports: [CarouselModule],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.css',
})
export class PopularCategoryComponent implements OnInit {
  categoriesList: Category[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1100: {
        items: 6,
      },
    },
    nav: true,
  };

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
