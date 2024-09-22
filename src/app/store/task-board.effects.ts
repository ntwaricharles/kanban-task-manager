import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskBoardService } from '../services/task.service';
import {
  loadBoards,
  loadBoardsSuccess,
  loadBoardsFailure,
} from './task-board.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TaskBoardEffects {
  constructor(
    private actions$: Actions,
    private taskBoardService: TaskBoardService
  ) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBoards),
      mergeMap(() =>
        this.taskBoardService.getBoards().pipe(
          map((boards) => loadBoardsSuccess({ boards })),
          catchError((error) => of(loadBoardsFailure({ error: error.message })))
        )
      )
    )
  );  
  
}
