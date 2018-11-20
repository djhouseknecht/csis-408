import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/core/category/category.service';
import { ICategory } from 'src/app/shared/models/category';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent {

  model = { category: null };

  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService) {}

  public addCategory(): void {
    this.categoryService.createCategory(this.model).subscribe(() => {
      this.activeModal.close();
    });
  }

}
