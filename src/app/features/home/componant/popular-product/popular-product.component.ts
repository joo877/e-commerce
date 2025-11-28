import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { AllproductService } from '../../../../core/services/pruduct/allproduct.service';
import { AllProduct } from '../../../../core/models/all-product.interface';

@Component({
  selector: 'app-popular-product',
  imports: [CardComponent],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css',
})
export class PopularProductComponent implements OnInit {
  allData: AllProduct[] = [];

  private readonly allproductService = inject(AllproductService);

  ngOnInit(): void {
    this.getAllproductData();
  }

  getAllproductData(): void {
    this.allproductService.getAllProduct().subscribe({
      next: (res) => {
        this.allData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
