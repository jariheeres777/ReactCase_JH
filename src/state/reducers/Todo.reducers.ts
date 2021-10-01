import {ITodoState} from "../containers/Todo.container";
import * as TodoActions from "../actions/Todo.action";
import {ActionType} from "typesafe-actions";
import {ITodo} from "../../model/interfaces/ITodo";

type Actions = ActionType<typeof TodoActions>

const initialState: ITodoState = {
    todos: []

};
const todoReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case TodoActions.LOAD_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload.todos
            }
        case TodoActions.CREATE_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload.todos
                ]
            }
        case TodoActions.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.todoId)
            }
        case TodoActions.MOVE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload.todo.id) {
                        const newTodo: ITodo = {
                            id: todo.id,
                            listId: todo.listId,
                            title: todo.title,
                            description: todo.description,
                            dueDate: todo.dueDate,
                            priority: todo.priority,
                            complete: todo.complete,
                            completedOn: todo.completedOn,
                            order: action.payload.todo.order + action.payload.number.valueOf()
                        }
                        console.log(newTodo)
                        return newTodo
                    } else {
                        if (todo.order === (action.payload.todo.order + action.payload.number.valueOf())) {
                            const newTodo: ITodo = {
                                id: todo.id,
                                listId: todo.listId,
                                title: todo.title,
                                description: todo.description,
                                dueDate: todo.dueDate,
                                priority: todo.priority,
                                complete: todo.complete,
                                completedOn: todo.completedOn,
                                order: action.payload.todo.order
                            }
                            console.log(newTodo)
                            return newTodo
                        } else {
                            return todo
                        }
                    }
                })
            }
        case TodoActions.UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo =>{
                    if(todo.id === action.payload.todos.id){
                        return action.payload.todos
                    }else{
                        return todo
                    }
                }))
            }

        default:
            return state;

    }
}
export default todoReducer;