import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBoards } from '../../store/task-board.actions';
import { selectAllTasks, selectTaskBoardState } from '../../store/task-board.selectors';
import { Board, Column, Task } from '../../board.model';
import { TaskBoardState } from '../../store/task-board.reducer';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  boards$: Observable<Board[]>;
  columns: Column[] = [];
  activeBoard: Board | null = null;
  selectedTask: Task | null = null; // Track selected task for modal

  @Output() boardNameChange = new EventEmitter<string>(); // Emit active board name

  constructor(private store: Store<{ boards: TaskBoardState }>) {
    this.store.dispatch(loadBoards());
    this.boards$ = this.store.select(selectAllTasks);
  }

  ngOnInit(): void {
    this.boards$.subscribe((boards) => {
      if (boards && boards.length > 0) {
        if (!this.activeBoard) {
          this.setActiveBoard(boards[0]); // Default to the first board
        }
        // Filter columns based on active board name
        this.store.select(selectTaskBoardState).subscribe((state) => {
          const activeBoard = state.boards.find(
            (board) => board.name === state.activeBoardName
          );
          if (activeBoard) {
            this.columns = activeBoard.columns;
          }
        });
      }
    });
  }

  setActiveBoard(board: Board) {
    this.activeBoard = board;
    this.columns = board.columns;
  }

  getCompletedSubtasks(task: Task): string {
    if (!task || !task.subtasks) {
      return '';
    }
    const completed = task.subtasks.filter((sub) => sub.isCompleted).length;
    return `${completed} of ${task.subtasks.length} subtasks completed`;
  }

  openTaskModal(task: Task) {
    this.selectedTask = task;
  }

  closeTaskModal() {
    this.selectedTask = null;
  }

  changeTaskStatus(newStatus: string) {
    if (this.selectedTask) {
      this.selectedTask.status = newStatus;
      this.columns = this.columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task !== this.selectedTask),
        };
      });
      this.columns
        .find((column) => column.name === newStatus)
        ?.tasks.push(this.selectedTask);
      this.closeTaskModal();
    }
  }
}
