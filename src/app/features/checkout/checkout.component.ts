import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);

  id: string | null = null;
  checkOutForm!: FormGroup;
  get shoppingAddress() {
    return this.checkOutForm.get('shoppingAddress') as FormGroup;
  }

  get details() {
    return this.shoppingAddress.get('details') as FormControl;
  }
  get phone() {
    return this.shoppingAddress.get('phone') as FormControl;
  }
  get city() {
    return this.shoppingAddress.get('city') as FormControl;
  }

  ngOnInit(): void {
    this.iniForm();
    this.getId();
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramUrl) => {
        this.id = paramUrl.get('id');
      },
    });
  }

  iniForm(): void {
    this.checkOutForm = this.fb.group({
      shoppingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }
  sumbmitForm(): void {
    this.cartService
      .checkOutSession(this.id, this.checkOutForm.value)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.open(res.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
