import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { todoReducer } from './app/features/todo/state/todo.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ todos: todoReducer }),
    provideStoreDevtools()
  ]
}).catch(err => console.error(err));