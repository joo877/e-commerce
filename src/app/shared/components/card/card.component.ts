import { Component, inject, Input } from '@angular/core';
import { AllProduct } from '../../../core/models/all-product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: AllProduct = {} as AllProduct;
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
}
