import { Injectable } from '@angular/core';
import { IBudgetItem } from 'src/app/shared/models/budget-item';
import { ICategory } from 'src/app/shared/models/category';
import { ICombinedBudget } from 'src/app/shared/models/combined-budget';
import { ITotals } from 'src/app/shared/models/totals';

@Injectable({providedIn: 'root'})
export class CombineService {

  constructor() { }

  /**
   * Combine a passed in list of budgetItems and categories
   * @param budgetItems
   * @param categories
   */
  public static combineBudgetAndCategories(categories: ICategory[], budgetItems: IBudgetItem[]): ICombinedBudget[] {
    let list: ICombinedBudget[] = [];

    /* if categories and/or budgetItems is null */
    if (!categories && !budgetItems) {
      return list;
    } else if (!categories) {
      list.push({category: null, budgetItems: budgetItems});
      return list;
    }

    /* build out list of category keys */
    categories.forEach(cat => {
      list.push({category: cat.category, budgetItems: []});
    });

    /* if no budget items, return the list */
    if (!budgetItems) {
      return list;
    }

    /* loop through budgetItems and add to correct key */
    budgetItems.forEach(item => {
      let found = list.findIndex(li => li.category === item.category);
      if (found > -1) {
        list[found].budgetItems.push(item);
      } else {
        list = CombineService.addToNullCategory(item, list);
      }
    });

    return list;
  }

  public static calculateTotals(list: ICombinedBudget[]): ITotals {
    let totals: ITotals = { income: 0, budgeted: 0, remaining: 0 };
    list.forEach(category => {
      category.budgetItems.forEach(item => {
        if (item.income && item.income === 'Y') {
          totals.income += item.amount || 0;
        } else {
          totals.budgeted += item.amount || 0;
        }
      });
    });
    totals.remaining = totals.income - totals.budgeted;
    return totals;
  }

  /**
   * Method to add budgetItem to the null category.
   *  If no null category, then it will create it.
   * @param budgetItem
   * @param currentList
   */
  private static addToNullCategory(budgetItem: IBudgetItem, currentList: ICombinedBudget[]): ICombinedBudget[] {
    let index = currentList.findIndex(li => li.category == null);
    if (index > -1) currentList[index].budgetItems.push(budgetItem);
    else currentList.push({category: null, budgetItems: [budgetItem]});
    return currentList;
  }
}
