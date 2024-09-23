import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column, Subtask, Task } from '../board.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  @Input() task: Task | null = null;
  @Input() columns: Column[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() statusChanged = new EventEmitter<string>();
  @Output() subtaskToggled = new EventEmitter<{
    task: any;
    subtaskIndex: number;
  }>();

  onStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.statusChanged.emit(target.value);
  }

  // Function to count completed subtasks
  completedSubtasks(): number {
    if (!this.task || !this.task.subtasks) return 0;
    return this.task.subtasks.filter(
      (subtask: { isCompleted: boolean }) => subtask.isCompleted
    ).length;
  }

  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  closeOnOverlayClick() {
    this.closeModal.emit();
  }

  editTask() {
    console.log('Edit Task:', this.task);
    this.dropdownVisible = false;
  }

  deleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
      console.log('Delete Task:', this.task);
      this.closeModal.emit();
    }
  }

  toggleSubtask(subtask: Subtask) {
    subtask.isCompleted = !subtask.isCompleted;
  }
}
