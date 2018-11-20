import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { SharedModule } from '../shared/shared.module';
import { BodyComponent } from './components/body/body.component';
import { AddCategoryModalComponent } from './components/add-category-modal/add-category-modal.component';
import { AddBudgetItemModalComponent } from './components/add-budget-item-modal/add-budget-item-modal.component';
import { ChangeBudgetModalComponent } from './components/change-budget-modal/change-budget-modal.component';

@NgModule({
  declarations: [
    BudgetComponent,
    BodyComponent,
    AddCategoryModalComponent,
    AddBudgetItemModalComponent,
    ChangeBudgetModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    BudgetComponent
  ],
  entryComponents: [
    AddCategoryModalComponent,
    AddBudgetItemModalComponent,
    ChangeBudgetModalComponent
  ]
})
export class BudgetModule { }
