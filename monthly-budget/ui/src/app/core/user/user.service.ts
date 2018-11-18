import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { AuthInterceptorService } from '../auth-interceptor/auth-interceptor.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthInterceptorService,
    private router: Router) { }

  /**
   * Get the current user
   */
  public helloUser(): Observable<IUser> {
    return this.http.get<IUser>(`${environment}/hello-user`);
  }

  public login(credentials: any, callback?: any): void {

      const headers = new HttpHeaders(credentials ? {authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)} : {});

    this.http.get<IUser>(`${environment.apiUrl}/hello-user`, {headers: headers}).subscribe(response => {
      if (response.username) {
          // this.authService.setAsUnauthenticated();
      } else {
          // this.authenticated = false;
          console.log(`authenticated`)
      }
      return callback && callback();
    });
  }



  /**
   * Log the current user out
   */
  public logOut(): void {
    this.http.post(`${environment.apiUrl}/logout`, {}).subscribe(() => {
      this.authService.setAsUnauthenticated();
      this.router.navigateByUrl('/login');
    });
  }

  /**
   * Determine if the user is authenitcated
   */
  public isAuthenticated(): Observable<boolean> {
    return this.authService.getisAuthenticated();
  }

}
