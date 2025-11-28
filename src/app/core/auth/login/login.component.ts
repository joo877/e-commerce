import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  msgError: string = '';
  isloadinng: boolean = false;
  flag: boolean = true;
  unSub: Subscription = new Subscription();
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],

      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      this.unSub.unsubscribe();
      this.isloadinng = true;
      this.authService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.cookieService.set('token', res.token);

            this.router.navigate(['/home']);
            this.isloadinng = false;
          }
        },
        error: (err) => {
          this.msgError = err.error.message;
          this.isloadinng = false;
        },
      });
      this.msgError = '';
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
