import { Injectable } from '@angular/core';
import { Task } from '../entities/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  vipeTasks() {
    localStorage.removeItem('task-list')
    return []
  }

  public removeTask(id: number) {
    const storageData = localStorage.getItem('task-list');
    if (storageData) {
      const taskList = JSON.parse(storageData) as Task[];
      console.log(taskList.splice(id, 1));
      localStorage.setItem("task-list", JSON.stringify(taskList));
      return taskList;
    } else {
      throw RangeError("No such element")
    }
  }

  public changeTask(id: number, val: Task) {
    const storageData = localStorage.getItem('task-list');
    if (storageData) {
      const taskList = JSON.parse(storageData) as Task[];
      taskList[id] = val
      localStorage.setItem("task-list", JSON.stringify(taskList));
      return taskList;
    } else {
      throw RangeError("No such element")
    }
  }

  public addTask(val: Task) {
    const storageData = localStorage.getItem('task-list');
    if (storageData) {
      const taskList = JSON.parse(storageData) as Task[];
      val.id = taskList.length
      const res = [...taskList, val]
      localStorage.setItem("task-list", JSON.stringify(res));
      return res;
    } else {
      val.id = 0
      const res = [val];
      localStorage.setItem("task-list", JSON.stringify(res));
      return res;
    }
  }

  public getTasks() {
    const storageData = localStorage.getItem('task-list');
    if (storageData) {
      return JSON.parse(storageData) as Task[];
    } else {
      return [];
    }
  }
}
