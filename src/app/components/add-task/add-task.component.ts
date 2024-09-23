import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Column } from '../../board.model';
import { selectActiveBoard } from '../../store/task-board.selectors';
import { TaskBoardState } from '../../store/task-board.reducer';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() createTask = new EventEmitter<any>();

  taskForm: FormGroup;
  activeBoard$: Observable<any>; // Observable for the active board
  columns: Column[] = [];

  constructor(private fb: FormBuilder, private store: Store<TaskBoardState>) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      subtasks: this.fb.array([this.fb.control('', Validators.required)]),
      status: ['', Validators.required], // Status (column name)
    });

    // Select the active board
    this.activeBoard$ = this.store.select(selectActiveBoard);
  }

  ngOnInit() {
    // Subscribe to the active board and get its data
    this.activeBoard$.subscribe((board) => {
      if (board) {
        this.columns = board.columns;
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

      this.createTask.emit(newTask);
      this.close.emit();
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
