import {createAction} from "typesafe-actions";
import {ITodo} from "../../model/interfaces/ITodo";

export const LOAD_TODOS = '[TODO] load';
export const LOAD_TODOS_SUCCESS = '[TODO] load success'

export const loadTodos = createAction(LOAD_TODOS);

export const loadTodoSuccess = createAction(LOAD_TODOS_SUCCESS, action =>
    (todos: ITodo[]) => action({todos}));