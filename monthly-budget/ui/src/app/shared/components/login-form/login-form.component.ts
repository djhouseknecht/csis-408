import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  public isAuthenticated: boolean;
  public error: boolean;
  public user: IUser;
  public credentials: { username: string, password: string } = { username: '', password: '' };

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(bool => {
      this.isAuthenticated = bool;
      this.user = this.userService.getUser();
    });
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.error = params.has('error');
    });
  }

  /**
   * Function to attempt to log a user in
   */
  public login() {
    this.userService.login(this.credentials.username, this.credentials.password, () => {
        this.router.navigateByUrl('/');
    });
    return false;
  }

}
