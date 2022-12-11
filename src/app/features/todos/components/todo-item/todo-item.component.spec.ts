import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TodoItemComponent } from 'src/app/features/todos/components/todo-item/todo-item.component';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';
import { TestPage } from 'src/app/shared/testing/test-page';

describe('TodoItemComponent', () => {
    let testComponent: TodoItemTestComponent;
    let fixture: ComponentFixture<TodoItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TodoItemComponent],
            imports: [FormsModule, ReactiveFormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoItemComponent);
        testComponent = new TodoItemTestComponent(fixture);
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(testComponent.component).toBeTruthy();
    });

    it('should emit updateTodo when form is submitted',() => {
        const todo: TodoItem = { id: 1, title: 'todo 1', isComplete: false };
        const expectedToDo: TodoItem = { id: 1, title: 'todo updated', isComplete: false };

        testComponent.component.todoItem = todo;
        fixture.detectChanges();
        spyOn(fixture.componentInstance.updateTodo, 'emit');
        testComponent.updateTitle(expectedToDo.title);

        expect(fixture.componentInstance.updateTodo.emit).toHaveBeenCalledWith({ ...expectedToDo });
    });

    it('should emit updateTodo when todo complete status changes', () =>{
        const todo: TodoItem = { id: 1, title: 'todo 1', isComplete: false };
        const expectedTodo: TodoItem = { id: 1, title: 'todo 1', isComplete: true };
        testComponent.component.todoItem = todo;
        fixture.detectChanges();
        spyOn(fixture.componentInstance.updateTodo, 'emit');

        testComponent.clickTodoStatus();

        expect(fixture.componentInstance.updateTodo.emit).toHaveBeenCalledWith({ ...expectedTodo });
    });

    it('should reset the form if the escape key is pressed', () => {
        testComponent.component.todoItem = { id: 1, title: 'todo 1', isComplete: false}
        fixture.detectChanges();
        testComponent.editTitle();
        testComponent.setTitle('todo updated')

        fixture.componentInstance.escapeKeyHandler();
        fixture.detectChanges();

        expect(testComponent.title).toBe('todo 1');
    });
});

class TodoItemTestComponent extends TestPage<TodoItemComponent> {
    public updateTitle(title: string): void {
        const titleDiv = this.fixture.debugElement.query(By.css('div.todo>div'));

        titleDiv.nativeElement.click();
        this.fixture.detectChanges();

        const input = this.fixture.debugElement.query(By.css('form>input'));
        const form = this.fixture.debugElement.query(By.css('form'));
        input.nativeElement.value = title;
        input.nativeElement.dispatchEvent(new Event('input'));
        form.triggerEventHandler('submit', null);
    }

    public editTitle(): void {
        const titleDiv = this.query('div.todo>div');

        titleDiv.nativeElement.click();
        this.fixture.detectChanges();
    }

    public setTitle(title: string): void {
        const input = this.query('form>input');

        input.nativeElement.value = title;
        input.nativeElement.dispatchEvent(new Event('input'));
        this.fixture.detectChanges();
    }

    public get title(): string {
        const input = this.query('div.todo>div');

        return input.nativeElement.innerText;
    }

    public clickTodoStatus(): void {
        const button = this.query('div.todo>button')

        button.nativeElement.click();
    }
}
