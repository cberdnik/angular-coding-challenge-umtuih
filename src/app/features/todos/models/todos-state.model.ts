import { TodoItem } from 'src/app/features/todos/models/todo-item.model';

export interface TodosStateModel {
    isLoading: boolean;
    todos: TodoItem[];
}
