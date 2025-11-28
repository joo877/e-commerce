import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  isloadinng: boolean = false;
  msgError: string = '';
  flag: boolean = true;
  unSub: Subscription = new Subscription();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],

        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
        rePassword: [
          null,
          [Validators.required, Validators.pattern(/^\w{6,}$/)],
        ],

        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      { validators: this.checkPasword }
    );
  }

  checkPasword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }

  submit(): void {
    if (this.registerForm.valid) {
      this.unSub.unsubscribe();
      this.isloadinng = true;
      this.authService.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.router.navigate(['/login']);
            console.log(res);
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
      this.registerForm.get('rePassword')?.patchValue('');
      this.registerForm.markAllAsTouched();
    }
  }
}
