import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import * as TodoActions from './todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: []
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { text }) => ({
    todos: [...state.todos, { id: Date.now(), text, completed: false }]
  })),
  on(TodoActions.toggleTodo, (state, { id }) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  on(TodoActions.removeTodo, (state, { id }) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }))
);