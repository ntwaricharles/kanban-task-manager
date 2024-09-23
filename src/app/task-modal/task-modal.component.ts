import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../board.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  @Input() task: Task | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() statusChanged = new EventEmitter<string>();
  @Output() subtaskToggled = new EventEmitter<{
    task: Task;
    subtaskIndex: number;
  }>();

  // Add the statuses array with possible task statuses
  statuses: string[] = ['To Do', 'In Progress', 'Completed'];

  changeStatus(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;

    if (selectElement) {
      const newStatus = selectElement.value;
      if (this.task) {
        this.task.status = newStatus;
        this.statusChanged.emit(newStatus); // Emit new status to parent component
      }
    }
  }

  toggleSubtask(index: number) {
    if (this.task) {
      this.subtaskToggled.emit({ task: this.task, subtaskIndex: index });
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
