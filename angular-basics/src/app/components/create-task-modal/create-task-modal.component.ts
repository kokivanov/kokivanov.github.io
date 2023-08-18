import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/entities/task';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css']
})
export class CreateTaskModalComponent implements OnInit {
  myForm : FormGroup;
  @Output() createTask = new EventEmitter<Task>();


  ngOnInit(): void {

  }

  constructor(private readonly fb : FormBuilder) {
    this.myForm = this.fb.group({
      desc: new FormControl('Task description', [Validators.required, Validators.maxLength(256)]),
      time: new FormControl(new Date().toISOString()),
      isComplete: new FormControl(false),
    });
  }

  onCreate() {
    const data = this.myForm.value;
    
    this.createTask.emit(data)
  }


}
