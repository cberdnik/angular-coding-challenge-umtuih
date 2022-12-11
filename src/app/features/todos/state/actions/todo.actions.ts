// noinspection JSUnusedGlobalSymbols

import { TodoItem } from 'src/app/features/todos/models/todo-item.model';

export class GetTodos {
    static readonly type = '[todos] GetTodos';

    constructor() {}
}

export class InsertTodo {
    static readonly type = '[todos] InsertTodo';

    constructor(public payload: TodoItem) {}
}

export class UpdateTodo {
    static readonly type = '[todos] UpdateTodo';

    constructor(public payload: TodoItem) {}
}

export class DeleteTodo {
    static readonly type = '[todos] DeleteTodo';

    constructor(public payload: TodoItem) {}
}
