import { Priority } from "../enums/priority";

export interface ITodo {
  id: string;
  listId: string;
  parentTodoId?: [String];
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  complete: boolean;
  completedOn?: Date;
  order: number;
  // @todo, add tags to todo's
}