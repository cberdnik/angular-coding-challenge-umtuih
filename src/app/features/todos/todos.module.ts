import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { TodosPageComponent } from 'src/app/features/todos/pages/todos/todos-page.component';
import { TodoListComponent } from 'src/app/features/todos/components/todo-list/todo-list.component';
import { TodoItemComponent } from 'src/app/features/todos/components/todo-item/todo-item.component';
import { TodosState } from 'src/app/features/todos/state/todos.state';
import { TodosServiceMock } from 'src/app/features/todos/services/todos-service-mock.service';
import { AddTodoItemComponent } from 'src/app/features/todos/components/add-todo-item/add-todo-item.component';

@NgModule({
    declarations: [
        TodosPageComponent,
        TodoListComponent,
        TodoItemComponent,
        AddTodoItemComponent],
    imports: [
        CommonModule,
        NgxsModule.forFeature([TodosState]),
        ReactiveFormsModule
    ],
    providers: [
        TodosServiceMock
    ]
})
export class TodosModule {}
