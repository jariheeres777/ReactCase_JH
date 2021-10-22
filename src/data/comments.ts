import {IComments} from '../model/interfaces/IComments'

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
const date = dd + '/' + mm + '/' + yyyy;

const initialComments: IComments[] =[
    {
        id: 'first_comment',
        todoId: 'first_todo',
        comment: 'good',
        date: date,
    },
    {
        id: 'first_nested_comment',
        todoId: 'first_todo',
        parentCommentId:'first_comment',
        comment: 'thanks',
        date: date,
    }
];

export default initialComments;

