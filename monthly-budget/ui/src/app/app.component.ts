import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  title: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(environment.apiUrl + '/test').subscribe(title => console.log(title))
  }
}
