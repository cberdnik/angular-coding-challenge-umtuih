import { async } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodosState } from 'src/app/features/todos/state/todos.state';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';
import { DeleteTodo, InsertTodo, UpdateTodo } from 'src/app/features/todos/state/actions/todo.actions';
import { TodosStateModel } from 'src/app/features/todos/models/todos-state.model';

describe('TodosSate', () => {
    let state: TodosState;
    let todosService;
    let stateCtx;
    const todos = <TodoItem[]>[
        { id: 1, title: 'todo 1', isComplete: false },
        { id: 2, title: 'todo 2', isComplete: false }
    ];

    beforeEach(async(() => {
        stateCtx = jasmine.createSpyObj('ctx', [
            'getState',
            'setState',
            'patchState']);
        todosService = jasmine.createSpyObj('todosService', [
            'getTodos',
            'insertTodo',
            'updateTodo',
            'deleteTodo'
        ]);

        todosService.getTodos.and.returnValue(of(todos));
        state = new TodosState(todosService);
    }));

    it('should call getToDos and set state', () => {
        state.getTodos(stateCtx).subscribe();

        expect(stateCtx.patchState).toHaveBeenCalledWith({ isLoading: true });
        expect(todosService.getTodos).toHaveBeenCalledTimes(1);
        expect(stateCtx.setState).toHaveBeenCalledWith({ isLoading: false, todos: todos });
    });

    it('should call insertTodo and set state', () => {
        const todo: TodoItem = { title: 'title', isComplete: false };
        const expectedTodo: TodoItem = { ...todo, id: 1 };
        todosService.insertTodo.and.returnValue(of(expectedTodo));
        stateCtx.getState.and.returnValue(<TodosStateModel>{ isLoading: false, todos: [] });

        state.insertTodo(stateCtx, new InsertTodo(todo)).subscribe();

        expect(stateCtx.getState).toHaveBeenCalledTimes(1);
        expect(stateCtx.patchState).toHaveBeenCalledWith(<TodosStateModel>{ isLoading: true });
        expect(todosService.insertTodo).toHaveBeenCalledWith(todo);
        expect(stateCtx.setState).toHaveBeenCalledWith(<TodosStateModel>{ isLoading: false, todos: [expectedTodo] });
    });

    it('should call updateTodo and set state when item changed', () => {
        const todo: TodoItem = { id: 1, title: 'title', isComplete: false };
        const expectedTodo: TodoItem = { ...todo, title: 'updated title', isComplete: true };
        todosService.updateTodo.and.returnValue(of(expectedTodo));
        stateCtx.getState.and.returnValue(<TodosStateModel>{ isLoading: false, todos: [{ ...todo }] });

        state.updateTodo(stateCtx, new UpdateTodo(expectedTodo)).subscribe();

        expect(stateCtx.getState).toHaveBeenCalledTimes(1);
        expect(stateCtx.patchState).toHaveBeenCalledWith(<TodosStateModel>{ isLoading: true });
        expect(todosService.updateTodo).toHaveBeenCalledWith(expectedTodo);
        expect(stateCtx.setState).toHaveBeenCalledWith(<TodosStateModel>{ isLoading: false, todos: [expectedTodo] });
    });


    it('should call deleteTodo and set state', () => {
        const todo: TodoItem = { id: 1, title: 'title', isComplete: false };
        const expectedTodos: TodoItem[] = [{ id: 2, title: 'title 2', isComplete: false }];
        todosService.deleteTodo.and.returnValue(of({ ...todo }));
        stateCtx.getState.and.returnValue(<TodosStateModel>{
            isLoading: false, todos: [{ ...todo }, { ...expectedTodos[0]}]
        });

        state.deleteTodo(stateCtx, new DeleteTodo(todo)).subscribe();

        expect(stateCtx.getState).toHaveBeenCalledTimes(1);
        expect(stateCtx.patchState).toHaveBeenCalledWith(<TodosStateModel>{ isLoading: true });
        expect(todosService.deleteTodo).toHaveBeenCalledWith(todo);
        expect(stateCtx.setState).toHaveBeenCalledWith(<TodosStateModel>{ isLoading: false, todos: expectedTodos });
    });
});
