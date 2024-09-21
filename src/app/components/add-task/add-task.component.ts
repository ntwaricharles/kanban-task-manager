import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() close = new EventEmitter<void>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      subtasks: this.fb.array([this.fb.control('', Validators.required)]),
      columnId: ['', Validators.required],
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
        columnId: this.taskForm.value.columnId,
      };

      console.log('New Task:', newTask);
      // Emit an event to close the modal after task creation
      this.close.emit();
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
