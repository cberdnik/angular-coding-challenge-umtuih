import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';
import { mockToDos } from 'src/app/features/todos/services/mock-todos';

@Injectable()
export class TodosServiceMock {
    private static readonly NetworkThrottling = 0;
    private readonly todoList: TodoItem[] = [];

    constructor() {
        this.todoList = mockToDos;
    }

    public getTodos(): Observable<TodoItem[]> {
        return of([...this.todoList]).pipe(delay(TodosServiceMock.NetworkThrottling));
    }

    // noinspection JSUnusedLocalSymbols
    public insertTodo(todoItem: TodoItem): Observable<TodoItem> {
        const newId = Math.max(...this.todoList.map(todo => todo.id)) + 1;
        const insertedToDo = { ...todoItem, id: newId };
        this.todoList.push(insertedToDo);

        return of({ ...insertedToDo }).pipe(delay(TodosServiceMock.NetworkThrottling));
    }

    public updateTodo(todoItem: TodoItem): Observable<TodoItem> {
        this.updateTodoItem(this.todoList, todoItem);

        return of({ ...todoItem }).pipe(delay(TodosServiceMock.NetworkThrottling));
    }

    // noinspection JSUnusedLocalSymbols
    public deleteTodo(todoItem: TodoItem): Observable<TodoItem> {
        this.removeToDoItem(this.todoList, todoItem);

        return of({ ...todoItem }).pipe(delay(TodosServiceMock.NetworkThrottling));
    }


    private updateTodoItem(todos: TodoItem[], todoItem: TodoItem): TodoItem[] {
        const idx = todos.findIndex(todo => todo.id === todoItem.id);

        return idx === -1 ? todos : [...todos.slice(0, idx), { ...todoItem }, ...todos.slice(idx + 1)];
    }

    private removeToDoItem(todos: TodoItem[], todoItem: TodoItem): TodoItem[] {
        const idx = todos.findIndex(todo => todo.id === todoItem.id);

        return idx === -1 ? todos : [...todos.slice(0, idx), ...todos.slice(idx + 1)];
    }
}
