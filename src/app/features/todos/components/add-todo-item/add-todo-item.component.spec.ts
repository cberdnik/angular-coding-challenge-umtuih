import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTodoItemComponent } from 'src/app/features/todos/components/add-todo-item/add-todo-item.component';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';
import { TestPage } from 'src/app/shared/testing/test-page';

describe('AddTodoComponent', () => {
    let testComponent: AddTodoItemTestComponent;
    let fixture: ComponentFixture<AddTodoItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddTodoItemComponent],
            imports: [FormsModule, ReactiveFormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddTodoItemComponent);
        testComponent = new AddTodoItemTestComponent(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(testComponent.component).toBeTruthy();
    });

    it('should emit insertTodo when form is submitted', () => {
        testComponent.setTitle('todo 1')
        spyOn(testComponent.component.insertTodo, 'emit');
        testComponent.submit();

        expect(fixture.componentInstance.insertTodo.emit).toHaveBeenCalledWith(<TodoItem>{ id: null, title: 'todo 1', isComplete: false });
    });

    it('should reset the form if the escape key is pressed', () => {
        testComponent.setTitle('todo 1')
        testComponent.component.escapeKeyHandler();
        fixture.detectChanges();

        expect(testComponent.title).toBe('');
    })
});

class AddTodoItemTestComponent extends TestPage<AddTodoItemComponent> {
    public setTitle(title: string): void {
        const input = this.query('form>input');

        input.nativeElement.value = title;
        input.nativeElement.dispatchEvent(new Event('input'));
        this.fixture.detectChanges();
    }

    public get title(): string {
        const input = this.query('form>input');

        return input.nativeElement.value;
    }

    public submit(): void {
        const form = this.query('form');

        form.triggerEventHandler('submit', null);
    }
}
