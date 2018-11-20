import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICategory } from 'src/app/shared/models/category';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private getCategories$: BehaviorSubject<ICategory[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  /**
   * Fire request to get categories. If already have it, just pass the observable back
   */
  public getCategories(): Observable<ICategory[]> {
    if (this.getCategories$.getValue().length == 0) {
      this.http.get<ICategory[]>(`${environment.apiUrl}/category`).subscribe(
        categories => this.getCategories$.next(categories
      ));
    }
    return this.getCategories$.asObservable();
  }

  /**
   * Create new category and emit updated list on success
   * @param category
   */
  public createCategory(category: ICategory): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/category`, category).pipe(
      tap(cat => {
        let list = this.getCategories$.getValue();
        list.push(cat);
        this.getCategories$.next(list);
      })
    );
  }
}
