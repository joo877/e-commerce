import { Token } from './../../models/token.interface';
import { CookieService } from 'ngx-cookie-service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { group } from 'console';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgrtpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgrtpassword.component.html',
  styleUrl: './forgrtpassword.component.css',
})
export class ForgrtpasswordComponent implements OnInit {
  flag: boolean = true;
  step: number = 1;
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });
    this.resetPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
    });
  }

  formStep1(): void {
    if (this.verifyEmail.valid) {
      this.authService.sumbmitVerfyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2;
        },
      });
    }
  }

  formStep2(): void {
    if (this.verifyCode.valid) {
      this.authService.sumbmitVerfyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
        },
      });
    }
  }

  formStep3(): void {
    if (this.resetPassword.valid) {
      this.authService
        .sumbmitResetPassword(this.resetPassword.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.cookieService.set('token', res.token);
            this.router.navigate(['/home']);
          },
        });
    }
  }
}
