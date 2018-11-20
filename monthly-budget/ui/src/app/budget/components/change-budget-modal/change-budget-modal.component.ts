import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/core/date/date.service';

@Component({
  selector: 'app-change-budget-modal',
  templateUrl: './change-budget-modal.component.html',
  styleUrls: ['./change-budget-modal.component.scss']
})
export class ChangeBudgetModalComponent {
  get months() {
    return DateService.getMonths();
  }
  get years() {
    return DateService.getYears();
  }

  public model: {year: number, month: number};
  public callback: any;

  constructor(private activeModal: NgbActiveModal) { }

  public changeBudget(): void {
    this.callback(this.model.year, this.model.month);
    this.activeModal.close();
  }

}
