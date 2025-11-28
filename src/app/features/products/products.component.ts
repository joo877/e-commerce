import { SearchPipe } from './../../shared/pipes/search-pipe';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { AllProduct } from '../../core/models/all-product.interface';
import { AllproductService } from '../../core/services/pruduct/allproduct.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  allData: AllProduct[] = [];
  pageSize!: number;
  p!: number;
  total!: number;
  text: string = '';

  private readonly allproductService = inject(AllproductService);

  ngOnInit(): void {
    this.getAllproductData();
  }

  getAllproductData(pageNumber: number = 1): void {
    this.allproductService.getAllProduct(pageNumber).subscribe({
      next: (res) => {
        this.allData = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
