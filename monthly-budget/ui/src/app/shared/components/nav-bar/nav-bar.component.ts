import { Component, OnInit } from '@angular/core';
import { Subscription, fromEvent, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  public showShadow: boolean = false;
  public authenticated: boolean;

  private subscriptionToScroll: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.isAuthenticated().subscribe(bool => this.authenticated = bool);

    // const scroll = fromEvent(document.getElementsByClassName('mybox'), 'scroll').pipe(
    //   map(value => value.target)
    // );

    // this.subscriptionToScroll = scroll.subscribe(value => {
    //   this.showShadow = value['scrollTop'] > 0;
    // });

  }

  // ngOnDestroy() {
  //   this.subscriptionToScroll.unsubscribe();
  // }

  logout() {
    this.userService.logOut();
  }

}
