import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { from, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  subscription = new Subscription();

  constructor (private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) { return next.handle(req); }
        let token = '';

        this.authService.token.subscribe(t => {
          token = t;
        })

        const modifiedRequest = req.clone({ 
          params: new HttpParams().set('auth', token)
        })

        return next.handle(modifiedRequest);
      })
    )
  }
}