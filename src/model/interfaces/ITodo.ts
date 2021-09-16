import { Priority } from "../enums/priority";

export interface ITodo {
  id: string;
  listId: string;
  parentTodoId?: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  complete: boolean;
  completedOn?: Date;
  // @todo, add tags to todo's
}