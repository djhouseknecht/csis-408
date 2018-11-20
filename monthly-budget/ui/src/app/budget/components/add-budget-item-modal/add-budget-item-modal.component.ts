import { Component, Input } from '@angular/core';
import { BudgetService } from 'src/app/core/budget/budget.service';
import { IBudgetItem } from 'src/app/shared/models/budget-item';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from 'src/app/shared/models/category';
import { DateService } from 'src/app/core/date/date.service';

@Component({
  selector: 'app-add-budget-item-modal',
  templateUrl: './add-budget-item-modal.component.html',
  styleUrls: ['./add-budget-item-modal.component.scss']
})
export class AddBudgetItemModalComponent {
  get months() {
    return DateService.getMonths();
  }
  get years() {
    return DateService.getYears();
  }
  @Input() categories: ICategory[];

  public model: IBudgetItem = {
    id: null,
    username: null,
    description: null,
    category: null,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    income: null,
    amount: 0.00,
  };

  constructor(public activeModal: NgbActiveModal, private budgetService: BudgetService) { }

  updateBudegetItem(): void {
    this.model.income = this.model.income || 'N';
    this.model.amount = this.model.amount || 0;

    if (this.model.id) {
      this.budgetService.updateBudgetItem(this.model).subscribe(() => {
        this.activeModal.close();
      });
    } else {
      this.budgetService.saveBudgetItem(this.model).subscribe(() => {
        this.activeModal.close();
      });
    }
  }

  deleteBudgetItem(): void {
    this.budgetService.deleteBudgetItem(this.model).subscribe(() => this.activeModal.close());
  }
}
