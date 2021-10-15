import {ITodo} from "../model/interfaces/ITodo";
import {Priority} from "../model/enums/priority";

const initialTodos: ITodo[] = [
    {
        id: 'first_todo',
        listId: 'default_list',
        title: 'Finish this app',
        priority: Priority.Normal,
        complete: false,
        order: 1,
        tags:[]
    },
    {
        id: 'second_todo',
        listId: 'default_list',
        title: 'Complete me',
        dueDate: new Date().toLocaleString().split(',')[0],
        priority: Priority.Normal,
        complete: false,
        order: 2,
        tags:['default','default2']
    },
    {
        id: 'third_todo',
        listId: 'default_list',
        title: 'sefsfe',
        dueDate: new Date().toLocaleString().split(',')[0],
        priority: Priority.Normal,
        complete: false,
        order: 3,
        tags:['default']
    },
    {
        id: 'fourted_todo',
        listId: 'default_list',
        title: 'Cgsetfjjtfomplete me',
        dueDate: new Date().toLocaleString().split(',')[0],
        priority: Priority.Normal,
        complete: false,
        order: 4,
        tags:[]
    }
];
export default initialTodos;