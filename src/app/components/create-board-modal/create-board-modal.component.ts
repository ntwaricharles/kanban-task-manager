import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { createBoard } from '../../store/task-board.actions';
import { Store } from '@ngrx/store';
import { Board } from '../../board.model';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
})
export class CreateBoardModalComponent {
  boardForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    // Initialize the form with a default board name and two columns (FormGroup for each column)
    this.boardForm = this.fb.group({
      boardName: ['', Validators.required],
      columns: this.fb.array([this.createColumn(), this.createColumn()]), // Two default columns
    });
  }

  // Getter for the columns form array
  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }

  // Function to create a new column form group
  createColumn(): FormGroup {
    // Wrapping the FormControl inside a FormGroup
    return this.fb.group({
      name: ['', Validators.required], // Name field for each column
    });
  }

  // Add a new column to the form array
  addColumn(): void {
    this.columns.push(this.createColumn());
  }

  // Remove a column from the form array at the given index
  removeColumn(index: number): void {
    if (this.columns.length > 1) {
      this.columns.removeAt(index);
    }
  }

  // Dispatch Create Board Action on form submission
  onSubmit(): void {
    if (this.boardForm.valid) {
      const { boardName, columns } = this.boardForm.value;

      const newBoard: Board = {
        name: boardName,
        columns: columns.map((col: { name: string }) => ({
          name: col.name,
          tasks: [],
        })),
      };

      this.store.dispatch(createBoard({ board: newBoard }));
      this.onClose(); // Close modal after dispatching
    }
  }

  // Close modal
  onClose(): void {
    // Close logic here, e.g., setting a flag to hide the modal
  }
}
