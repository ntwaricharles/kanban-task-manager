import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBoards } from '../../store/task-board.actions';
import { selectAllTasks } from '../../store/task-board.selectors';
import { Board } from '../../board.model';
import { TaskBoardState } from '../../store/task-board.reducer';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  boards$: Observable<Board[]>;

  columns: any[] = [];

  constructor(private store: Store<{ boards: TaskBoardState }>) {
    this.store.dispatch(loadBoards());
    this.boards$ = this.store.select(selectAllTasks);

  }

  ngOnInit(): void {

    this.boards$.subscribe(
      (boards) => {
        console.log('Boards data:', boards);
        if (boards && boards.length > 0) {
          this.columns = boards[0].columns;
        }
      },
      (error) => {
        console.error('Error fetching boards data:', error);
      }
    );
  }
}
