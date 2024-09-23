import { createAction, props } from '@ngrx/store';
import { Board, Task } from '../board.model';

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


// Action to set the active board name
export const setActiveBoardName = createAction(
  '[Task Board] Set Active Board Name',
  props<{ boardName: string }>()
);

export const updateTask = createAction(
  '[Task Board] Update Task',
  props<{ task: Task }>()
); 

// Create a New Board Action
export const createBoard = createAction(
  '[Task Board] Create Board',
  props<{ board: Board }>()
);

// Optionally, create a success/failure action
export const createBoardSuccess = createAction(
  '[Task Board] Create Board Success',
  props<{ board: Board }>()
);

export const createBoardFailure = createAction(
  '[Task Board] Create Board Failure',
  props<{ error: any }>()
); 

export const updateBoard = createAction(
  '[Task Board] Update Board',
  props<{ board: Board }>()
); 

export const addTask = createAction(
  '[Task Board] Add Task',
  props<{ boardName: string; columnName: string; task: Task }>()
);