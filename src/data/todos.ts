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
        priority: Priority.Normal,
        complete: false,
        order: 2
    },
    {
        id: 'third_todo',
        listId: 'default_list',
        title: 'sefsfe',
        dueDate: new Date(),
        priority: Priority.Normal,
        complete: false,
        order: 3
    },
    {
        id: 'fourted_todo',
        listId: 'default_list',
        title: 'Cgsetfjjtfomplete me',
        dueDate: new Date(),
        priority: Priority.Normal,
        complete: false,
        order: 4
    }
];
export default initialTodos;