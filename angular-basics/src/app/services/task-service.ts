import { Task } from '../entities/task';

export class TaskService {
  tasks: Task[];

  constructor() {}

  vipeTasks() {
    this.tasks = []
    localStorage.removeItem('task-list')
    return this.tasks
  }

  removeTask(id: number) {
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

  changeTask(id: number, val: Task) {
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

  addTask(val: Task) {
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

  getTasks() {
    const storageData = localStorage.getItem('task-list');
    if (storageData) {
      return JSON.parse(storageData) as Task[];
    } else {
      return [];
    }
  }
}
