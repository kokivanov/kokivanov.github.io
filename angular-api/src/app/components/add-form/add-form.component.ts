import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  itemForm = new FormGroup({
    content: new FormControl('', [Validators.required, this.notEmpty]),
  });

  constructor(private readonly _apiService: ApiService) {}

  private notEmpty(control: AbstractControl<String>) {
    return control.value.trim().length > 0 ? null : { isEmpty: true };
  }

  public onSubmit() {
    if (this.itemForm.value.content) {
      this._apiService.addItem({ content: this.itemForm.value.content });
    }
  }
}
