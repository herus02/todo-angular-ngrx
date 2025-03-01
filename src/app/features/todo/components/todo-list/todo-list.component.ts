import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoState } from '../../state/todo.reducer';
import * as TodoActions from '../../state/todo.actions';
import * as TodoSelectors from '../../state/todo.selectors';

type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  currentFilter: FilterType = 'all';
  
  todos$ = this.store.select(TodoSelectors.selectAllTodos);
  activeTodos$ = this.store.select(TodoSelectors.selectActiveTodos);
  completedTodos$ = this.store.select(TodoSelectors.selectCompletedTodos);

  constructor(private store: Store<{ todos: TodoState }>) {}

  get visibleTodos$() {
    switch (this.currentFilter) {
      case 'active':
        return this.activeTodos$;
      case 'completed':
        return this.completedTodos$;
      default:
        return this.todos$;
    }
  }

  setFilter(filter: FilterType) {
    this.currentFilter = filter;
  }

  addTodo(text: string) {
    if (text.trim()) {
      this.store.dispatch(TodoActions.addTodo({ text }));
    }
  }

  toggleTodo(id: number) {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  removeTodo(id: number) {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }
}