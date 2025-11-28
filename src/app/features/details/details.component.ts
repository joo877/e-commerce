import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { AllProduct } from '../../core/models/all-product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  id: string | null = null;
  productDetails: AllProduct = {} as AllProduct;
  private readonly toastrService = inject(ToastrService);

  private readonly cartService = inject(CartService);

  addProtudtToCart(id: string): void {
    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
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
    },
    nav: true,
  };

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly productDetailsService = inject(ProductDetailsService);

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetails();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParam) => {
        this.id = urlParam.get('id');
      },
    });
  }

  getProductDetails(): void {
    this.productDetailsService.getProdutDetails(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        console.log(res.data.images);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
