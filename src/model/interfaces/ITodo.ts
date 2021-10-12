import {Priority} from "../enums/priority";

export interface ITodo {
    id: string;
    listId: string;
    parentTodoId?: string;
    title: string;
    description?: string;
    dueDate?: string;
    priority: Priority;
    complete: boolean;
    completedOn?: string;
    order: number;
    tags?: [];
}