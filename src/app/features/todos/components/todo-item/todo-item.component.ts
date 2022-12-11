import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html'
})
export class TodoItemComponent implements OnInit {
    @Input() todoItem: TodoItem;
    @Output() updateTodo = new EventEmitter<TodoItem>();
    @Output() deleteTodo = new EventEmitter<TodoItem>();
    @ViewChild('title') titleInput: ElementRef;

    public editItem = false;
    public todoFormGroup: FormGroup;
    public initialFormValues: unknown;

    constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.buildForm();
    }

    @HostListener('document:keydown.escape', ['$event'])
    public escapeKeyHandler(): void {
        if (this.titleInput != null) {
            this.todoFormGroup.reset(this.initialFormValues);
            this.titleInput.nativeElement.blur();
        }
    }

    public onTodoCompletedClick(): void {
        this.updateTodo.emit({ ...this.todoItem, isComplete: !this.todoItem.isComplete });
    }

    public onEditToDoClick() {
        this.editItem = true;
        this.cdRef.detectChanges();
        this.titleInput.nativeElement.focus();
    }

    public onUpdateTodo(): void {
        this.editItem = false;

        if (this.todoChanged()) {
            this.updateTodo.emit(<TodoItem>{ ...this.todoFormGroup.value });
        }
    }

    private buildForm() {
        if (this.todoItem == null) {
            this.todoItem = { title: '', isComplete: false };
        }
        this.todoFormGroup = this.formBuilder.group({
            id: [this.todoItem.id],
            title: [this.todoItem.title],
            isComplete: [this.todoItem.isComplete]
        });
        this.initialFormValues = this.todoFormGroup.value;
    }

    private todoChanged(): boolean {
        const updateTodo = <TodoItem>this.todoFormGroup.value;

        return updateTodo.title !== this.todoItem.title ||
            updateTodo.isComplete !== this.todoItem.isComplete
    }
}
