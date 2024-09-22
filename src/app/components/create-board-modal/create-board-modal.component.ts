import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createBoard, updateBoard } from '../../store/task-board.actions'; // Import updateBoard action
import { Board } from '../../board.model';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
})
export class CreateBoardModalComponent {
  @Input() board: Board | null = null; // Input to pass the board for editing
  @Output() closeModal = new EventEmitter<void>(); // Emit event to close modal
  @Output() saveBoard = new EventEmitter<Board>();

  boardForm: FormGroup;
  isEditing: boolean = false; // Track if we're in editing mode

  constructor(private fb: FormBuilder, private store: Store) {
    this.boardForm = this.fb.group({
      boardName: ['', Validators.required],
      columns: this.fb.array([]), // Initialize an empty form array
    });
  }

  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }

  // Populate form with board's data when editing
  ngOnChanges() {
    if (this.board) {
      this.isEditing = true;
      this.boardForm.patchValue({ boardName: this.board.name });

      // Clear existing columns and populate with current board columns
      this.columns.clear();
      this.board.columns.forEach((column) => {
        this.columns.push(this.fb.group({ name: column.name }));
      });
    } else {
      this.isEditing = false;
      this.boardForm.reset();
      this.columns.clear();
      this.addColumn(); // Add default columns for creating new board
      this.addColumn();
    }
  }

  createColumn(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  addColumn(): void {
    this.columns.push(this.createColumn());
  }

  removeColumn(index: number): void {
    if (this.columns.length > 1) {
      this.columns.removeAt(index);
    }
  }

  onSubmit(): void {
    const { boardName, columns } = this.boardForm.value;

    if (this.boardForm.valid) {
      const updatedBoard: Board = {
        name: boardName,
        columns: columns.map((col: { name: string }) => ({
          name: col.name,
          tasks:
            this.board?.columns.find((c) => c.name === col.name)?.tasks || [], // Retain tasks if editing
        })),
      };


      this.saveBoard.emit(updatedBoard);

      if (this.isEditing && this.board) {
        // Update existing board
        this.store.dispatch(updateBoard({ board: updatedBoard }));
      } else {
        // Create new board
        this.store.dispatch(createBoard({ board: updatedBoard }));
      }

      this.onClose(); // Close the modal after submission
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
