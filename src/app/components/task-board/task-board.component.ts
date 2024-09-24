import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBoards, setActiveBoardName, updateBoard, updateTask } from '../../store/task-board.actions';
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
          this.setActiveBoard(boards[0]);
        }
        this.store.select(selectTaskBoardState).subscribe((state) => {
          const activeBoard = state.boards.find(
            (board) => board.name === state.activeBoardName
          );
          if (activeBoard) {
            this.activeBoard = activeBoard;
            this.columns = activeBoard.columns;
            console.log('Updated Active Board:', this.activeBoard);
          }
        });
      }
    });
  }

  setActiveBoard(board: Board) {
    this.store.dispatch(setActiveBoardName({ boardName: board.name }));
  }

  openCreateColumnModal() {
    this.isCreateColumnModalOpen = true;
  }

  closeCreateColumnModal() {
    this.isCreateColumnModalOpen = false;
  }

  onSaveBoard(updatedBoard: Board) {
    this.store.dispatch(updateBoard({ board: updatedBoard }));
    this.closeCreateColumnModal();
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
      console.log('Updated Board after task creation:', updatedBoard);

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
      this.store.dispatch(updateTask({ task: this.selectedTask }));
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
