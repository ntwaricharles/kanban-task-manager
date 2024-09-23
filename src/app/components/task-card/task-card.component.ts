import { Component, Input } from '@angular/core';
import { Task, Column } from '../../board.model'; 

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() columns: Column[] = [];

  showModal = false; 

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleStatusChange(newStatus: string) {
    this.task.status = newStatus;
    this.closeModal();
  }

  handleSubtaskToggled({
    task,
    subtaskIndex,
  }: {
    task: Task;
    subtaskIndex: number;
  }) {
    task.subtasks[subtaskIndex].isCompleted =
      !task.subtasks[subtaskIndex].isCompleted;
  }

  getCompletedSubtasks(): string {
    const totalSubtasks = this.task.subtasks.length;
    const completedSubtasks = this.task.subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length;

    return `${completedSubtasks} of ${totalSubtasks} completed`;
  }
}
