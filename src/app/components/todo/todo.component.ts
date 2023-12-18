import { Component, signal } from '@angular/core';
import { FilterType, TodoModel } from '../../models/todo';
import { Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todolist = signal<TodoModel[]>([
    {
      id: 1,
      title: 'Comprar leche',
      completed: true,
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
  ]);
  filter = signal<FilterType>('all');
  newTodo = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  changeFilter(filterString: FilterType) {
    this.filter.set(filterString);
  }
  addTodo() {
    const newTodoTitle = this.newTodo.value.trim();
    if (this.newTodo.valid && newTodoTitle !== '') {
      this.todolist.update((prev_todos) => {
        return [
          ...prev_todos,
          { id: Date.now(), title: newTodoTitle, completed: false },
        ];
      });
      this.newTodo.reset();
    } else {
      this.newTodo.reset();
    }
  }
  toogleTodo(todoId: number) {
    this.todolist.update((prev_todos) =>
      prev_todos.map((todo) => {
       return todo.id === todoId? { ...todo, completed: !todo.completed }
       :todo;
      })
    );
  }
  removeTodo(todoId: number) {
    this.todolist.update ((prev_todos) => 
      prev_todos.filter((todo)=>todo.id !== todoId)
    )
  }
  updateTodoEditingMode(todoId: number) {
    return this.todolist.update((prev_todos) =>
      prev_todos.map((todo) => {
        return todo.id === todoId ?
        { ...todo, editing: true}:
        {...todo, editing: false};
      })
    )
  }
}
