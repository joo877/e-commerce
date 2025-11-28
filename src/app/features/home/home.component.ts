import { Component, inject, OnInit } from '@angular/core';
import { MainSliderComponent } from './componant/main-slider/main-slider.component';
import { PopularCategoryComponent } from './componant/popular-category/popular-category.component';
import { PopularProductComponent } from './componant/popular-product/popular-product.component';

@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    PopularCategoryComponent,
    PopularProductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
