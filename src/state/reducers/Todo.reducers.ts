import {ITodoState} from "../containers/Todo.container";
import * as TodoActions from "../actions/Todo.action";
import {ActionType} from "typesafe-actions";

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
        default:
            return state;

    }
}
export default todoReducer;