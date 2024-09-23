import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskBoardState } from './task-board.reducer';

// Change 'tasks' to 'taskBoard' since that's the name in StoreModule.forRoot
export const selectTaskBoardState =
  createFeatureSelector<TaskBoardState>('taskBoard');

export const selectAllTasks = createSelector(
  selectTaskBoardState,
  (state: TaskBoardState) => state.boards
);

export const selectTaskError = createSelector(
  selectTaskBoardState,
  (state: TaskBoardState) => state.error
);

export const selectActiveBoard = createSelector(
  selectTaskBoardState,
  (state: TaskBoardState) =>
    state.boards.find((board) => board.name === state.activeBoardName)
);