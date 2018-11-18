import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public credentials = {username: '', password: ''};

  constructor(private userService: UserService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    let headers = new HttpHeaders();
    headers.append('Authorization', `Basic ${btoa('user:password')}`);

    this.http.get('http://localhost:8080/hello-user', {headers: headers}).subscribe(user => {
      console.log(user)
    });
    // this.userService.helloUser().subscribe(user => {
    //   console.log(user)
    // });
  }


  login() {
    this.userService.login(this.credentials, () => {
        this.router.navigateByUrl('/');
    });
    return false;
  }

}
