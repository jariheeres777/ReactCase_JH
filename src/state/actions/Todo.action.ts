import {createAction} from "typesafe-actions";
import {ITodo} from '../../model/interfaces/ITodo'

export const LOAD_TODOS = '[todo] load';
export const LOAD_TODOS_SUCCESS = '[todo] load success'

export const loadTodos = createAction(LOAD_TODOS)

export const loadTodosSucces = createAction(LOAD_TODOS_SUCCESS, action =>
    (todos: ITodo[]) => action({todos}));