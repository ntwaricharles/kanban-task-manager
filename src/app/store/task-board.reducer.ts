import { createReducer, on } from '@ngrx/store';
import { loadBoardsSuccess, loadBoardsFailure, setActiveBoardName, updateTask, createBoard, updateBoard, addTask } from './task-board.actions';
import { Board } from '../board.model';

// Define the shape of the Task Board state
export interface TaskBoardState {
  boards: Board[];
  error: any;
  activeBoardName: string | null;
}

// Initial state
export const initialState: TaskBoardState = {
  boards: [],
  error: null,
  activeBoardName: null,
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
  })),

  on(createBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board], // Add the new board to the array
  })),

  on(updateBoard, (state, { board }) => ({
    ...state,
    boards: state.boards.map((b) => (b.name === board.name ? board : b)),
  })),

  on(setActiveBoardName, (state, { boardName }) => ({
    ...state,
    activeBoardName: boardName, // Update active board name
  })),

  on(addTask, (state, { boardName, columnName, task }) => {
    const updatedBoards = state.boards.map((board) => {
      if (board.name === boardName) {
        const updatedColumns = board.columns.map((column) => {
          if (column.name === columnName) {
            return {
              ...column,
              tasks: [...column.tasks, task], // Add the new task to the column
            };
          }
          return column;
        });

        return {
          ...board,
          columns: updatedColumns,
        };
      }
      return board;
    });

    return {
      ...state,
      boards: updatedBoards,
    };
  }),

  on(updateTask, (state, { task }) => {
    const updatedBoards = state.boards.map((board) => {
      const updatedColumns = board.columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.map((t) => (t.title === task.title ? task : t)),
        };
      });
      return { ...board, columns: updatedColumns };
    });

    return { ...state, boards: updatedBoards };
  })
);
