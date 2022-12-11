import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TodosStateModel } from 'src/app/features/todos/models/todos-state.model';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';
import { DeleteTodo, GetTodos, InsertTodo, UpdateTodo } from 'src/app/features/todos/state/actions/todo.actions';
import { TodosServiceMock } from 'src/app/features/todos/services/todos-service-mock.service';

const defaultSate: TodosStateModel = {
    isLoading: false,
    todos: []
};

@State<TodosStateModel>({
    name: 'todos',
    defaults: defaultSate
})
@Injectable()
export class TodosState {
    @Selector()
    static isLoading(state: TodosStateModel): boolean {
        return state.isLoading;
    }

    @Selector()
    static todos(state: TodosStateModel): TodoItem[] {
        return state.todos;
    }

    constructor(private todosService: TodosServiceMock) {}

    @Action(GetTodos)
    public getTodos(ctx: StateContext<TodosStateModel>): Observable<TodoItem[]> {
        ctx.patchState({ isLoading: true });

        return this.todosService.getTodos().pipe(
            tap((todos: TodoItem[]) => {
                ctx.setState({ isLoading: false, todos: todos });
            }),
            catchError(err => {
                return this.handleError(ctx, err);
            })
        );
    }

    @Action(InsertTodo)
    public insertTodo(ctx: StateContext<TodosStateModel>, action: InsertTodo): Observable<TodoItem> {
        const state = ctx.getState();
        ctx.patchState({ isLoading: true });

        return this.todosService.insertTodo(action.payload).pipe(
            tap((todoItem: TodoItem) => {
                ctx.setState({
                    isLoading: false,
                    todos: [...state.todos, todoItem]
                });
            }),
            catchError(err => this.handleError(ctx, err))
        );
    }

    @Action(UpdateTodo)
    public updateTodo(ctx: StateContext<TodosStateModel>, action: UpdateTodo): Observable<TodoItem | never> {
        const state = ctx.getState();

        ctx.patchState({ isLoading: true });

        return this.todosService.updateTodo(action.payload).pipe(
            tap((todoItem: TodoItem) => {
                ctx.setState({
                    isLoading: false,
                    todos: this.updateTodoItem(state.todos, todoItem)
                });
            }),
            catchError(err => this.handleError(ctx, err))
        );
    }

    @Action(DeleteTodo)
    public deleteTodo(ctx: StateContext<TodosStateModel>, action: DeleteTodo): Observable<TodoItem> {
        const state = ctx.getState();
        ctx.patchState({ isLoading: true });

        return this.todosService.deleteTodo(action.payload).pipe(
            tap((todoItem: TodoItem) => {
                ctx.setState({
                    isLoading: false,
                    todos: this.removeTodoItem(state.todos, todoItem)
                });
            }),
            catchError(err => this.handleError(ctx, err))
        );
    }

    private updateTodoItem(todos: TodoItem[], todoItem: TodoItem): TodoItem[] {
        const idx = todos.findIndex(todo => todo.id === todoItem.id);

        return idx === -1 ? todos : [...todos.slice(0, idx), todoItem, ...todos.slice(idx + 1)];
    }

    private removeTodoItem(todos: TodoItem[], todoItem: TodoItem): TodoItem[] {
        const idx = todos.findIndex(todo => todo.id === todoItem.id);

        return idx === -1 ? todos : [...todos.slice(0, idx), ...todos.slice(idx + 1)];
    }

    private handleError(ctx: StateContext<TodosStateModel>, err: unknown): Observable<never> {
        ctx.patchState({ isLoading: false });

        return throwError(err);
    }
}
