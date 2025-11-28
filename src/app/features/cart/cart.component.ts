import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './interface/cart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  productCart: Cart = {} as Cart;

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productCart = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItemCart(id: string): void {
    this.cartService.removeSppacificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.productCart = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCount(id: string, count: number): void {
    this.cartService.updateItem(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.productCart = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
