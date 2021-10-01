import {createAction} from "typesafe-actions";
import {ITodo} from '../../model/interfaces/ITodo'

export const LOAD_TODOS = '[todo] load';
export const LOAD_TODOS_SUCCESS = '[todo] load success'
export const CREATE_TODO = '[todo] create'
export const DELETE_TODO = '[todo] delete'

export const loadTodos = createAction(LOAD_TODOS)

export const loadTodosSucces = createAction(LOAD_TODOS_SUCCESS, action =>
    (todos: ITodo[]) => action({todos}));

export const createTodo = createAction(CREATE_TODO, action =>
    (todos: ITodo) => action({todos}));

export const deletetodo = createAction(DELETE_TODO, action =>
    (todoId: string) => action({todoId})
);
