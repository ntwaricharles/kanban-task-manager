import { createAction, props } from '@ngrx/store';
import { Board } from '../board.model';

// Load Boards Action
export const loadBoards = createAction('[Task Board] Load Boards');

// Load Boards Success Action
export const loadBoardsSuccess = createAction(
  '[Task Board] Load Boards Success',
  props<{ boards: Board[] }>()
);

// Load Boards Failure Action
export const loadBoardsFailure = createAction(
  '[Task Board] Load Boards Failure',
  props<{ error: any }>()
);
