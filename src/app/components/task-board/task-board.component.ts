import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBoards } from '../../store/task-board.actions';
import { selectAllTasks } from '../../store/task-board.selectors'; // Import selector
import { Board } from '../../board.model'; // Import Board model
import { TaskBoardState } from '../../store/task-board.reducer';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  boards$!: Observable<Board[]>;

  constructor(private store: Store<{ boards: TaskBoardState }>) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(selectAllTasks);
    // Dispatch action to load boards from the store (i.e., from the service or API)
    this.store.dispatch(loadBoards());

    // Subscribe to the boards$ observable to log the data
    this.boards$.subscribe(
      (boards) => {
        console.log('Boards data:', boards);
      },
      (error) => {
        console.error('Error fetching boards data:', error);
      }
    );
  }
}
