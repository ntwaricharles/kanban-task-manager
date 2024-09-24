import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createBoard, updateBoard } from '../../store/task-board.actions'; 
import { Board } from '../../board.model';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
})
export class CreateBoardModalComponent {
  @Input() board: Board | null = null; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveBoard = new EventEmitter<Board>();

  boardForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.boardForm = this.fb.group({
      boardName: ['', Validators.required],
      columns: this.fb.array([]),
    });
  }

  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }

  ngOnChanges() {
    if (this.board) {
      this.isEditing = true;
      this.boardForm.patchValue({ boardName: this.board.name });

      this.columns.clear();
      this.board.columns.forEach((column) => {
        this.columns.push(this.fb.group({ name: column.name }));
      });
    } else {
      this.isEditing = false;
      this.boardForm.reset();
      this.columns.clear();
      this.addColumn();
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
            this.board?.columns.find((c) => c.name === col.name)?.tasks || [],
        })),
      };


      this.saveBoard.emit(updatedBoard);

      if (this.isEditing && this.board) {
        this.store.dispatch(updateBoard({ board: updatedBoard }));
      } else {
        this.store.dispatch(createBoard({ board: updatedBoard }));
      }

      this.onClose();
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
