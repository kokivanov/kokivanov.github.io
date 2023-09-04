import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      headers: request.headers.append(
        'Authorization',
        'Bearer ' + this._authService.apiKey
      ),
    });
    return next.handle(newReq);
  }
}
