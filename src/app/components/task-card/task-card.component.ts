import { Component, Input } from '@angular/core';
import { Task, Column } from '../../board.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TaskBoardState } from '../../store/task-board.reducer';
import { selectActiveBoard } from '../../store/task-board.selectors';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() columns: Column[] = [];

  activeBoard$: Observable<any> | null = null;

  constructor(private store: Store<TaskBoardState>) {
    // Subscribe to the active board
    this.activeBoard$ = this.store.select(selectActiveBoard);
    this.activeBoard$.subscribe((board) => {
      console.log('Active Board:', board);
    });
  }

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
