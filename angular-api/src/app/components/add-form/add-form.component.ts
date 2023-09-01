import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  itemForm = new FormGroup({
    content: new FormControl(''),
  });

  constructor(private readonly apiService: ApiService) {}

  public onSubmit() {
    if (this.itemForm.value.content) {
      this.apiService.addItem({ content: this.itemForm.value.content });
    }
    console.log(this.itemForm.value);
  }
}
