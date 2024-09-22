import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Column } from '../../board.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Input() columns: Column[] = []; // Receive columns (statuses) as input
  @Output() close = new EventEmitter<void>();
  @Output() createTask = new EventEmitter<any>(); // Emit created task

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      subtasks: this.fb.array([this.fb.control('', Validators.required)]),
      status: ['', Validators.required], // Status (column name)
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
        status: this.taskForm.value.status, // Status is the column name
      };

      this.createTask.emit(newTask); // Emit task
      this.close.emit(); // Close modal
      this.taskForm.reset(); // Reset form
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
