import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoItem } from 'src/app/features/todos/models/todo-item.model';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo-item.component.html'
})
export class AddTodoItemComponent implements OnInit {
    @Output() insertTodo = new EventEmitter<TodoItem>();
    @ViewChild('title') titleInput: ElementRef;

    public todoFormGroup: FormGroup;
    public initialFormValues: unknown;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.buildForm();
    }

    @HostListener('document:keydown.escape', ['$event'])
    public escapeKeyHandler(): void {
        this.todoFormGroup.reset(this.initialFormValues);
        this.titleInput.nativeElement.blur();
    }

    public onAddTodo(): void {
        this.insertTodo.emit(<TodoItem>{ ...this.todoFormGroup.value });
        this.todoFormGroup.reset(this.initialFormValues);
    }

    public setFocus(): void {
        this.titleInput.nativeElement.focus();
    }

    private buildForm(): void {
        this.todoFormGroup = this.formBuilder.group({
            id: [],
            title: [''],
            isComplete: [false]
        });
        this.initialFormValues = this.todoFormGroup.value;
    }
}
