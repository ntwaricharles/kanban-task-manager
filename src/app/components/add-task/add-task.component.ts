import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Column } from '../../board.model';
import { selectActiveBoard } from '../../store/task-board.selectors';
import { TaskBoardState } from '../../store/task-board.reducer';
import { addTask } from '../../store/task-board.actions';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() createTask = new EventEmitter<any>();

  taskForm: FormGroup;
  activeBoard$: Observable<any>;
  columns: Column[] = [];
  boardName: string | null = null;
  columnName: string | null = null; 

  constructor(private fb: FormBuilder, private store: Store<TaskBoardState>) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      subtasks: this.fb.array([this.fb.control('', Validators.required)]),
      status: ['', Validators.required],
    });

    this.activeBoard$ = this.store.select(selectActiveBoard);
  }

  ngOnInit() {
    this.activeBoard$.subscribe((board) => {
      if (board) {
        this.columns = board.columns;
        this.boardName = board.name;
        console.log('Active board:', board);
      }
    });
  }

  get subtasks(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control('', Validators.required));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        subtasks: this.taskForm.value.subtasks.map((subtask: string) => ({
          title: subtask,
          isCompleted: false,
        })),
        status: this.taskForm.value.status,
      };

      if (this.boardName && this.taskForm.value.status) {
        this.store.dispatch(
          addTask({
            boardName: this.boardName,
            columnName: this.taskForm.value.status,
            task: newTask,
          })
        );
      } else {
        console.error('Board name or column name is null');
      }

      this.close.emit();
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
