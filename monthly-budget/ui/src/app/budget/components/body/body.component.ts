import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/category/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryModalComponent } from '../add-category-modal/add-category-modal.component';
import { ICategory } from 'src/app/shared/models/category';
import { Subscription } from 'rxjs';
import { AddBudgetItemModalComponent } from '../add-budget-item-modal/add-budget-item-modal.component';
import { IBudgetItem } from 'src/app/shared/models/budget-item';
import { BudgetService } from 'src/app/core/budget/budget.service';
import { CombineService } from 'src/app/core/combine/combine.service';
import { ICombinedBudget } from 'src/app/shared/models/combined-budget';
import { ChangeBudgetModalComponent } from '../change-budget-modal/change-budget-modal.component';
import { DateService } from 'src/app/core/date/date.service';
import { ITotals } from 'src/app/shared/models/totals';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public budget: {year: number, month: number} = {year: null, month: null};

  public budgetItems: IBudgetItem[];
  public categories: ICategory[] = [];

  public combinedBudgetToCategory: ICombinedBudget[];
  public totals: ITotals = {} as any;

  public categorySubscription: Subscription;
  public budgetSubscription: Subscription;

  constructor(
    public modalService: NgbModal,
    private categoryService: CategoryService,
    private budgetService: BudgetService) { }

  ngOnInit() {
    let date = new Date();
    this.updateBudget(date.getFullYear(), date.getMonth() + 1);

    /* get user's categories */
    this.categorySubscription = this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.populateCombinedBudget();
      });

    /* get user's budget */
    this.budgetSubscription = this.budgetService.getBudget().subscribe(budget => {
      this.budgetItems = budget;
      this.populateCombinedBudget();
    });
  }

  /* clean up subscriptions */
  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
    this.budgetSubscription.unsubscribe();
  }

  /**
   * Combine user's categories and budget items
   */
  public populateCombinedBudget(): void {
    this.combinedBudgetToCategory = CombineService.combineBudgetAndCategories(this.categories, this.budgetItems);
    this.totals = CombineService.calculateTotals(this.combinedBudgetToCategory);
  }

  /**
   * Open change budget modal
   */
  public changeBudget(): void {
    const modal = this.modalService.open(ChangeBudgetModalComponent);
    modal.componentInstance.callback = (year, month) => {this.updateBudget(year, month)};
    modal.componentInstance.model = Object.assign({}, this.budget);
  }

  /**
   * Open add category modal
   */
  public addCategory(): void {
    this.modalService.open(AddCategoryModalComponent);
  }

  /**
   * Open add budget item modal passing in an optional
   *  category flag
   * @param category
   */
  public addBudgetItem(category?: string): void {
    const modal = this.modalService.open(AddBudgetItemModalComponent);
    modal.componentInstance.categories = this.categories;
    if (category) modal.componentInstance.model.category = category;
  }

  /**
   * Open add budget item modal in edit mode
   * @param item
   */
  public editBudgetItem(item: IBudgetItem): void {
    const modal = this.modalService.open(AddBudgetItemModalComponent);
    modal.componentInstance.categories = this.categories;
    modal.componentInstance.model = item;
  }

  /**
   * Update component's budget year and month
   *  Then fire new http request to get budget
   * @param year
   * @param month
   */
  public updateBudget(year: number, month: number): void {
    this.budget.year = year;
    this.budget.month = month;
    this.budgetService.fireHttpRequestForBudget(year, month);
  }

  /**
   * Return string of budget's month and year for templete's header
   */
  public getBudgetAsString(): string {
    if (!this.budget || !this.budget.month || !this.budget.year) return 'Budget';
    let res = DateService.getMonthAsString(this.budget.month);
    return `${res} ${this.budget.year} Budget`;
  }

  public getTotalsForCategory(budget: ICombinedBudget): number {
    if (!budget || !budget.budgetItems || budget.budgetItems.length === 0) return 0;

    let total = 0;
    budget.budgetItems.forEach(item => {
      total += item.amount;
    });
    return total;
  }

}
