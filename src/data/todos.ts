import {ITodo} from "../model/interfaces/ITodo";
import {Priority} from "../model/enums/priority";

const initialTodos: ITodo[] = [
    {
        id: 'first_todo',
        listId: 'default_list',
        title: 'Finish this app',
        priority: Priority.Normal,
        complete: false,
        order: 1
    },
    {
        id: 'second_todo',
        listId: 'default_list',
        title: 'Complete me',
        dueDate: new Date(),
        parentTodoId:["first_todo"],
        priority: Priority.Normal,
        complete: false,
        order: 2
    }
];
export default initialTodos;