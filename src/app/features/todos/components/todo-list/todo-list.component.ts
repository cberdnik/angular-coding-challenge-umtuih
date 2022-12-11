import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
  @Input() todos: TodoItem[];
  @Output() updateTodo = new EventEmitter<TodoItem>();
  @Output() deleteTodo = new EventEmitter<TodoItem>();
}
