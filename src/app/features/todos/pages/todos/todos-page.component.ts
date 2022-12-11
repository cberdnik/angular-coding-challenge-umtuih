import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodosState } from 'src/app/features/todos/state/todos.state';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';
import { InsertTodo, GetTodos, DeleteTodo, UpdateTodo } from 'src/app/features/todos/state/actions/todo.actions';

@Component({
    selector: 'app-to-dos',
    templateUrl: './todos-page.component.html',
    styleUrls: ['./todos-page.component.css']
})
export class TodosPageComponent implements OnInit{
    @Select(TodosState.isLoading) isLoading$: Observable<boolean>;
    @Select(TodosState.todos) todos$: Observable<TodoItem[]>;

    constructor(private store: Store) { }

    public ngOnInit(): void {
        this.store.dispatch(new GetTodos());
    }

    public onInsertTodo(todoItem: TodoItem): void {
        this.store.dispatch(new InsertTodo(todoItem));
    }

    public onUpdateTodo(todoItem: TodoItem): void {
        this.store.dispatch(new UpdateTodo(todoItem));
    }

    public onRemoveTodo(todoItem: TodoItem): void {
        this.store.dispatch(new DeleteTodo(todoItem));
    }
}
