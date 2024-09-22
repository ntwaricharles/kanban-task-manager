import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBoards, setActiveBoardName, updateBoard } from '../../store/task-board.actions';
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
  selectedTask: Task | null = null;
  isCreateColumnModalOpen = false;
  isAddTaskModalOpen: boolean = false;

  @Output() boardNameChange = new EventEmitter<string>();

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
        this.store.select(selectTaskBoardState).subscribe((state) => {
          const activeBoard = state.boards.find(
            (board) => board.name === state.activeBoardName
          );
          if (activeBoard) {
            this.activeBoard = activeBoard;
            this.columns = activeBoard.columns;
          }
        });
      }
    });
  }

  setActiveBoard(board: Board) {
    this.store.dispatch(setActiveBoardName({ boardName: board.name }));
  }

  // Open the modal to add a new column
  openCreateColumnModal() {
    this.isCreateColumnModalOpen = true; // Show the modal
  }

  // Close the modal after saving changes
  closeCreateColumnModal() {
    this.isCreateColumnModalOpen = false; // Hide the modal
  }

  // Update board after adding a column
  onSaveBoard(updatedBoard: Board) {
    this.store.dispatch(updateBoard({ board: updatedBoard }));
    this.closeCreateColumnModal(); // Close the modal after saving
  }

  toggleAddTaskModal() {
    this.isAddTaskModalOpen = !this.isAddTaskModalOpen;
  }

  onCreateTask(newTask: {
    title: string;
    description: string;
    subtasks: any[];
    status: string;
  }) {
    if (this.activeBoard) {
      const updatedColumns = this.activeBoard.columns.map((column) => {
        if (column.name === newTask.status) {
          return {
            ...column,
            tasks: [...column.tasks, { ...newTask, status: newTask.status }],
          };
        }
        return column;
      });

      const updatedBoard: Board = {
        ...this.activeBoard,
        columns: updatedColumns,
      };
      this.store.dispatch(updateBoard({ board: updatedBoard }));
    }
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
      this.updateTaskInColumns(this.selectedTask);
      this.closeTaskModal();
    }
  }

  toggleSubtask({ task, subtaskIndex }: { task: Task; subtaskIndex: number }) {
    const subtask = task.subtasks[subtaskIndex];
    subtask.isCompleted = !subtask.isCompleted;
  }

  updateTaskInColumns(task: Task) {
    this.columns = this.columns.map((column) => {
      return {
        ...column,
        tasks: column.tasks.map((t) => (t === task ? { ...task } : t)),
      };
    });
  }
}
