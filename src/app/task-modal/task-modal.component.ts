import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board, Task } from '../board.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  @Input() task: Task | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() statusChanged = new EventEmitter<string>();
  @Input() selectedBoard!: Board | null;

  close() {
    this.closeModal.emit();
  }

  changeStatus(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    this.statusChanged.emit(newStatus);
  }
}
