import {action, createAction} from "typesafe-actions";
import {ITodo} from '../../model/interfaces/ITodo'

export const LOAD_TODOS = '[todo] load';
export const LOAD_TODOS_SUCCESS = '[todo] load success'
export const CREATE_TODO = '[todo] create'
export const DELETE_TODO = '[todo] delete'
export const MOVE_TODO = '[todo] move todo'
export const UPDATE_TODO = '[todo] update todo'

export const loadTodos = createAction(LOAD_TODOS)

export const loadTodosSucces = createAction(LOAD_TODOS_SUCCESS, action =>
    (todos: ITodo[]) => action({todos}));

export const createTodo = createAction(CREATE_TODO, action =>
    (todos: ITodo) => action({todos}));

export const deleteTodo = createAction(DELETE_TODO, action =>
    (todoId: string) => action({todoId}));

export const moveTodo = createAction(MOVE_TODO, action =>
    (todo: ITodo, number: Number) => action({todo, number}));

export const updateTodo = createAction(UPDATE_TODO,action=>
    (todos: ITodo) => action({todos}));