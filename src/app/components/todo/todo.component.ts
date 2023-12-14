import { Component, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todolist = signal<TodoModel[]> ([
    
      {
        id: 1,
        title: 'Comprar leche',
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: 'Fregar platos',
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: 'Sacar basura',
        completed: false,
        editing: false,
      },
    ],
  );
  filter = signal<FilterType>('all')
  changeFilter (filterString: FilterType) {
    this.filter.set(filterString)
  }
}
