import { createReducer, on } from '@ngrx/store';
import { loadBoardsSuccess, loadBoardsFailure } from './task-board.actions';
import { Board } from '../board.model';

// Define the shape of the Task Board state
export interface TaskBoardState {
  boards: Board[];
  error: any;
}

// Initial state
export const initialState: TaskBoardState = {
  boards: [],
  error: null,
};

// Create the reducer function
export const taskBoardReducer = createReducer(
  initialState,
  on(loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards,
    error: null,
  })),
  on(loadBoardsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
