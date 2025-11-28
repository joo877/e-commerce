import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserorderService {
  private readonly httpClient = inject(HttpClient);

  getUserOrder(id: string | null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${id}`);
  }
}
