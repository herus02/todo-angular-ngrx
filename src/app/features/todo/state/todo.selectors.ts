import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const selectTodoState = (state: { todos: TodoState }) => state.todos;

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectActiveTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => !todo.completed)
);

export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => todo.completed)
);