import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board, Column } from '../../board.model';
import { deleteBoard, setActiveBoardName, updateBoard } from '../../store/task-board.actions';
import { TaskBoardState } from '../../store/task-board.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() activeBoardName!: string;
  @Input() columns: Column[] = [];
  @Input() activeBoard: Board | null = null;
  @Output() openDeleteModal = new EventEmitter<void>();

  showModal: boolean = false;
  dropdownVisible = false;
  isCreateColumnModalOpen = false;

  constructor(private store: Store<{ boards: TaskBoardState }>) {}

  setActiveBoard(board: Board) {
    this.store.dispatch(setActiveBoardName({ boardName: board.name }));
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  deleteBoard() {
    if (
      this.activeBoardName &&
      confirm('Are you sure you want to delete this board?')
    ) {
      this.store.dispatch(deleteBoard({ boardName: this.activeBoardName }));
    }
    this.dropdownVisible = false;
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
}
