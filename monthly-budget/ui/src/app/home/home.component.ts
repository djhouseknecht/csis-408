import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public isAuthenticated: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getisAuthenticated().subscribe(bool => this.isAuthenticated = bool);
  }

  public route(route: string): void {
    this.router.navigate([route]);
  }

}
