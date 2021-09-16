import { ITodo } from "../model/interfaces/ITodo";
import { Priority } from "../model/enums/priority";

const initialTodos: ITodo[] = [
  {
    id: 'first_todo',
    listId: 'default_list',
    title: 'Finish this app',
    priority: Priority.Normal,
    complete: false
  },
  {
    id: 'second_todo',
    listId: 'default_list',
    title: 'Complete me',
    dueDate: new Date(),
    priority: Priority.Normal,
    complete: false
  }
];

export default initialTodos;