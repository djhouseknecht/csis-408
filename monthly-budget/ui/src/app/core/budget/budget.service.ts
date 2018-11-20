import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from "rxjs";
import { IBudgetItem } from 'src/app/shared/models/budget-item';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private getBudgetItems$: BehaviorSubject<IBudgetItem[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  /**
   * Return observable to get budgetItems
   */
  public getBudget(): Observable<IBudgetItem[]> {
    return this.getBudgetItems$.asObservable();
  }

  /**
   * Fire off request to backend to get budget. It will emit
   *  to the getBudget() observable
   * @param year
   * @param month
   */
  public fireHttpRequestForBudget(year: number, month: number): void {
    this.http.get<IBudgetItem[]>(`${environment.apiUrl}/budget?year=${year}&month=${month}`)
      .subscribe(budget => this.getBudgetItems$.next(budget));
  }

  /**
   * Save a new budget item
   * @param item
   */
  public saveBudgetItem(item: IBudgetItem): Observable<any> {
    return this.http.post(`${environment.apiUrl}/budget`, item).pipe(
      tap(item => {
        let list = this.getBudgetItems$.getValue();
        list.push(item);
        this.getBudgetItems$.next(list);
      })
    );
  }

  /**
   * Update an existing budget item
   * @param item
   */
  public updateBudgetItem(item: IBudgetItem): Observable<IBudgetItem> {
    return this.http.put<IBudgetItem>(`${environment.apiUrl}/budget/${item.id}`, item).pipe(
      tap(item => {
        let list = this.getBudgetItems$.getValue();
        let index = list.findIndex(i => i.id === item.id);
        if (index > -1) {
          list[index] = item;
          this.getBudgetItems$.next(list);
        }
      })
    );
  }

  public deleteBudgetItem(item: IBudgetItem): Observable<IBudgetItem> {
    return this.http.delete<IBudgetItem>(`${environment.apiUrl}/budget/${item.id}`).pipe(
      tap(() => {
        let list = this.getBudgetItems$.getValue();
        let index = list.findIndex(i => i.id === item.id);
        if (index > -1) {
          list.splice(index, 1);
          this.getBudgetItems$.next(list);
        }
      })
    )
  }

}
