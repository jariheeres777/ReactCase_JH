import {ITodo} from "../model/interfaces/ITodo";
import {Priority} from "../model/enums/priority";

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
const date = dd + '/' + mm + '/' + yyyy;

const initialTodos: ITodo[] = [
    {
        id: 'first_todo',
        listId: 'default_list',
        title: 'Finish this app',
        priority: Priority.Normal,
        complete: false,
        order: 1,
        tags:[],
        user:''
    },
    {
        id: 'second_todo',
        listId: 'default_list',
        title: 'Complete me',
        dueDate: date,
        priority: Priority.Normal,
        complete: false,
        order: 2,
        tags:['default','default2'],
        user:''
    },
    {
        id: 'third_todo',
        listId: 'default_list',
        title: 'sefsfe',
        dueDate: date,
        priority: Priority.Normal,
        complete: false,
        order: 3,
        tags:['default'],
        user:''
    },
    {
        id: 'fourted_todo',
        listId: 'default_list',
        title: 'Cgsetfjjtfomplete me',
        dueDate: '10/10/2021',
        priority: Priority.Normal,
        complete: false,
        order: 4,
        tags:[],
        user:''
    }
];
export default initialTodos;