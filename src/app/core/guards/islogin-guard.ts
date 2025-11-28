import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isloginGuard: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService);
  let router = inject(Router);
  if (cookieService.get('token')) {
    return router.parseUrl('/home');
  } else {
    return true;
  }
};
