import { createAction} from "typesafe-actions";
import {ITodo} from '../../model/interfaces/ITodo'

export const LOAD_TODOS = '[todo] load';
export const LOAD_TODOS_SUCCESS = '[todo] load success'
export const CREATE_TODO = '[todo] create'
export const DELETE_TODO = '[todo] delete'
export const MOVE_TODO = '[todo] move todo'
export const UPDATE_TODO = '[todo] update todo'
export const NEST_TODO = '[todo] nest in/out todo'
export const COMPLETED_TODO = '[todo] complete todo'
export const DELETE_TAG_TODO = '[todo] delete tag todo'
export const ADD_TAG_TODO = '[todo] add tag todo'
export const DELETE_TAG_ALL_TODO = '[todo] delete all tag todo'
export const DELETE_ALL_TODO_LIST = '[todo] delete all todos from activelist'

export const loadTodos = createAction(LOAD_TODOS)

export const loadTodosSucces = createAction(LOAD_TODOS_SUCCESS, action =>
    (todos: ITodo[]) => action({todos}));

export const createTodo = createAction(CREATE_TODO, action =>
    (todos: ITodo) => action({todos}));

export const deleteTodo = createAction(DELETE_TODO, action =>
    (todoId: string) => action({todoId}));

export const moveTodo = createAction(MOVE_TODO, action =>
    (todo: ITodo, number: number) => action({todo, number}));

export const updateTodo = createAction(UPDATE_TODO, action =>
    (todos: ITodo) => action({todos}));

export const nestTodo = createAction(NEST_TODO, action =>
    (todoIdParent: string, todoIdChild: string) => action({todoIdParent, todoIdChild}));

export const completedTodo = createAction(COMPLETED_TODO, action =>
    (todoId: string) => action({todoId}));

export const deleteTagTodo = createAction(DELETE_TAG_TODO, action =>
    (todoId: string, tagId: string) => action({todoId, tagId}));

export const addTagTodo = createAction(ADD_TAG_TODO, action =>
    (todoId: string, tagId: string) => action({todoId, tagId}));

export const deleteTagAllTodo = createAction(DELETE_TAG_ALL_TODO, action =>
    (tagId: string) => action({tagId}));

export const deleteAllTodoList = createAction(DELETE_ALL_TODO_LIST, action =>
    (listid: string) => action({listid}));