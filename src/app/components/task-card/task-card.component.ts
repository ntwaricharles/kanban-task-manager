import { Component, Input } from '@angular/core';
import { Task } from '../../board.model'; // Use the correct Task model

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task; // Task passed from TaskListComponent

  // Method to calculate completed subtasks
  getCompletedSubtasks(): string {
    const totalSubtasks = this.task.subtasks.length;
    const completedSubtasks = this.task.subtasks.filter(
      (subtask) => subtask.isCompleted
    ).length;

    return `${completedSubtasks} of ${totalSubtasks} completed`;
  }
}
