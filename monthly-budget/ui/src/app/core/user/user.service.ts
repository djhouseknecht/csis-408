import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { Router, NavigationExtras } from '@angular/router';
import { distinctUntilChanged, finalize, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {

  private token: string = '';
  private user: IUser;
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router) { }

  /**
   * Get the current user
   */
  public helloUser(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/hello-user`);
  }

  public getUser(): IUser|null {
    return this.user;
  }

  /**
   * Log the current user in and pass in an optional callback
   * @param credentials
   * @param callback
   */
  public login(username: string, password: string, callback?: any): void {
    this.setToken(username, password);
    this.helloUser().subscribe(user => {
      this.user = user;
      this.isAuthenticated$.next(true);
      return callback && callback();
    }, (err) => {
      this.setAsUnauthenticated();
      this.redirectToLogin(true);
    });
  }


  /**
   * Expose observable to subscribe to for authentication changes
   */
  public getisAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  /**
   * Get the current hashed token
   */
  public getToken(): string {
    return this.token;
  }

  /**
   * Log the current user out
   */
  public logOut(): void {
    this.http.post(`${environment.apiUrl}/custom-logout`, {}).pipe(
      finalize(() => {
        this.setAsUnauthenticated();
        this.user = null;
        this.router.navigateByUrl('/login');
      }))
    .subscribe();
  }

  /**
   * Determine if the user is authenitcated
   */
  public isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * Navigate to login form
   */
  public redirectToLogin(error?: boolean): void {
    let options: NavigationExtras = error ? {queryParams: {error: true}} : {};
    this.router.navigateByUrl('/login', options);
  }

  /**
   * Clear the token and emit false to isAuthenticated$
   */
  private setAsUnauthenticated(): void {
    this.isAuthenticated$.next(false);
    this.token = '';
  }

  /**
   * Set the current token based on passed in username and password
   * @param username
   * @param password
   */
  private setToken(username: string, password: string): void {
    this.token =  btoa(`${username}:${password}`);
  }
}
