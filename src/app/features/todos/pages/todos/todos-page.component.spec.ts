import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TodosPageComponent } from 'src/app/features/todos/pages/todos/todos-page.component';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';
import { TodosState } from 'src/app/features/todos/state/todos.state';
import { TestPage } from 'src/app/shared/testing/test-page';
import { DeleteTodo, InsertTodo, UpdateTodo } from 'src/app/features/todos/state/actions/todo.actions';
import { TodosServiceMock } from 'src/app/features/todos/services/todos-service-mock.service';

@Component({
    selector: 'app-add-todo',
    template: '<div>app-add-todo</div>'
})
class AddTodoMockComponent {
    @Output() insertTodo = new EventEmitter<TodoItem>();
}

@Component({
    selector: 'app-todo-list',
    template: '<div>app-todo-list</div>'
})
class TodoListMockComponent {
    @Input() todos: TodoItem[];
    @Output() updateTodo = new EventEmitter<TodoItem>();
    @Output() deleteTodo = new EventEmitter<TodoItem>();
}

describe('ToDosPageComponent', () => {
    let testPage: TodosTestPage;
    let fixture: ComponentFixture<TodosPageComponent>;
    let todosService;

    beforeEach(async(() => {
        todosService = jasmine.createSpyObj('todosService', {
            'getTodos': of(<TodoItem[]>[]),
            'insertTodo': of(<TodoItem>{ id: 1, title: 'todo 1', isComplete: false}),
            'updateTodo': of(<TodoItem>{ id: 1, title: 'todo 1', isComplete: false}),
            'deleteTodo': of(<TodoItem>{ id: 1, title: 'todo 1', isComplete: false})
        });
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([TodosState])],
            declarations: [
                TodosPageComponent,
                AddTodoMockComponent,
                TodoListMockComponent
            ],
            providers: [
                { provide: TodosServiceMock, useValue: todosService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosPageComponent);
        testPage = new TodosTestPage(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(testPage.component).toBeTruthy();
    });

    it('should dispatch InsertTodo when todo is added', () => {
        const todo: TodoItem = { title: 'todo 1', isComplete: false };
        const store = <Store>TestBed.get(Store);

        spyOn(store, 'dispatch');
        testPage.emitAddTodoEvent(todo);

        expect(store.dispatch).toHaveBeenCalledWith(new InsertTodo(todo));
    });

    it('should dispatch UpdateTodo when todo is updated', () => {
        const todo: TodoItem = { title: 'todo 1', isComplete: false };
        const store = <Store>TestBed.get(Store);

        spyOn(store, 'dispatch');
        testPage.emitUpdateTodoEvent(todo);

        expect(store.dispatch).toHaveBeenCalledWith(new UpdateTodo(todo));
    });

    it('should dispatch DeleteTodo when todo is deleted', () => {
        const todo: TodoItem = { title: 'todo 1', isComplete: false };
        const store = <Store>TestBed.get(Store);

        spyOn(store, 'dispatch');
        testPage.emitDeleteTodoEvent(todo);

        expect(store.dispatch).toHaveBeenCalledWith(new DeleteTodo(todo));
    });
});

class TodosTestPage extends TestPage<TodosPageComponent> {
    public emitAddTodoEvent(todo: TodoItem): void {
        const addTodoComponent = this.fixture.debugElement.query(By.directive(AddTodoMockComponent));

        addTodoComponent.componentInstance.insertTodo.emit(todo);
    }

    public emitUpdateTodoEvent(todo: TodoItem): void {
        const addTodoComponent = this.fixture.debugElement.query(By.directive(TodoListMockComponent));

        addTodoComponent.componentInstance.updateTodo.emit(todo);
    }

    public emitDeleteTodoEvent(todo: TodoItem): void {
        const addTodoComponent = this.fixture.debugElement.query(By.directive(TodoListMockComponent));

        addTodoComponent.componentInstance.deleteTodo.emit(todo);
    }
}
