import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/entities/task';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks : Task[]
  showModal = false

  constructor (private readonly taskService: TaskService){}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks()
  }

  createTask(data: Task) {
    this.tasks = this.taskService.addTask(data)
    console.log(data)
    this.showModal = false
  }

  onCreateClick() {
    this.showModal = true
  }

  onVipeClick() {
    this.tasks = this.taskService.vipeTasks()
  }

  deleteTask(data: Task) {
    if (data.id !== undefined) {
      this.tasks = this.taskService.removeTask(data.id)
    }
  }
}
