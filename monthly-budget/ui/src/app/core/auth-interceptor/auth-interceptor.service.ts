import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {

  private authToken: string;
  private isAuthenticated$: BehaviorSubject<boolean>;

  constructor(private router: Router, private http: HttpClient) {
    this.isAuthenticated$ = new BehaviorSubject(false);
  }

  /**
   * Intercept all requests to ensure user is authenticated
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /* if no token, redirect to login page */
    if (!this.authToken || !this.isAuthenticated$.getValue()) {
      this.redirect();
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        credentials: 'include',
        'X-Requested-With': 'XMLHttpRequest',
        // 'Authorization': `Basic ${this.authToken}`
      },
      withCredentials: true,
    });

    // if (!request.headers.has('Authorization')) request.headers.set('Authorization', `Basic ${this.authToken}`);

    return next.handle(request)
      .pipe(catchError(response => {
        if (response.status == 401) {
          this.setAsUnauthenticated();
          this.redirect();
          return of(response);
        } else {
          return throwError(response);
        }
      }));
  }

  private redirect(): void {
    this.router.navigate(['login']);
  }

  public setAsUnauthenticated(): void {
    this.isAuthenticated$.next(false);
    this.authToken = null;
  }

  public getisAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

}

