import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTasks } from '../../store/task-board.selectors';
import { Board } from '../../board.model';
import { TaskBoardState } from '../../store/task-board.reducer';
import { setActiveBoardName } from '../../store/task-board.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isSidebarHidden = false;
  isCreateBoardModalOpen = false;
  boards$: Observable<Board[]>;
  activeBoard: Board | null = null; // Track the currently active board

  @Output() boardSelected = new EventEmitter<Board>();

  constructor(private store: Store<{ boards: TaskBoardState }>) {
    this.boards$ = this.store.select(selectAllTasks);
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark');
    localStorage.setItem(
      'darkMode',
      body.classList.contains('dark').toString()
    );
  }

  setActiveBoard(board: Board) {
    this.activeBoard = board;
    this.boardSelected.emit(board);
    this.store.dispatch(setActiveBoardName({ boardName: board.name })); // Dispatch action
  }

  ngOnInit() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark');
    }

    // Pre-select "Platform Launch" as the active board on load
    this.boards$.subscribe((boards) => {
      if (boards && boards.length > 0) {
        const platformLaunchBoard = boards.find(
          (b) => b.name === 'Platform Launch'
        );
        if (platformLaunchBoard) {
          this.setActiveBoard(platformLaunchBoard);
        }
      }
    });
  }
}
