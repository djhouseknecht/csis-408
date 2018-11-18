import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }

  /**
   * Intercept all requests to ensure user is authenticated
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        credentials: 'include',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Basic ${this.userService.getToken()}`
      },
      withCredentials: true,
    });

    return next.handle(request)
      .pipe(catchError(response => {
        if (response.status == 401) {
          this.userService.redirectToLogin(true);
          return of(response);
        } else {
          return throwError(response);
        }
      }));
  }
}

