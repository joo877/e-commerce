import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../models/token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  registerForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }
  loginForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }

  logOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  dedcodeToken() {
    let token: Token = {} as Token;
    try {
      token = jwtDecode(this.cookieService.get('token'));
    } catch (error) {
      this.logOut();
    }
    return token;
  }

  sumbmitVerfyEmail(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/forgotPasswords',
      data
    );
  }
  sumbmitVerfyCode(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/verifyResetCode',
      data
    );
  }

  sumbmitResetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + 'auth/resetPassword',
      data
    );
  }
}
