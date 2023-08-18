import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/entities/task';
import { TaskService } from 'src/app/services/task-service';
import {faXmark} from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() src : Task
  @Output() onDelete = new EventEmitter<Task>();

  ico = faXmark

  constructor(){}

  onDeleteClick() {
    this.onDelete.emit(this.src)
  }
}
