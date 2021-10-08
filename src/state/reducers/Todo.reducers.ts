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
        case TodoActions.MOVE_TODO:
            const moveList = state.todos
            const moveFromIndex = moveList.findIndex(todo => todo.id === action.payload.todo.id)
            if (moveFromIndex === -1) {
                return state
            }
            const moveToIndex = moveList.findIndex(todo => todo.order === (action.payload.todo.order + action.payload.number))
            if (moveToIndex === -1) {
                return state
            }
            moveList[moveFromIndex].order = moveList[moveToIndex].order
            moveList[moveToIndex].order = action.payload.todo.order
            return {
                ...state,
                lists: moveList
            }
        case TodoActions.UPDATE_TODO:
            const updatedList = state.todos
            const index = updatedList.findIndex(todo => todo.id === action.payload.todos.id)
            if (index === -1) {
                return state
            }
            updatedList[index] = action.payload.todos
            return {
                ...state,
                todos: updatedList
            }
        case TodoActions.NEST_TODO_INTO:
            const nestIn = state.todos
            const I = nestIn.findIndex(todo => todo.id === action.payload.todoIdChild)
            if (I === -1) {
                return state
            }
            nestIn[I].parentTodoId = action.payload.todoIdParent
            return {
                ...state,
                todos: nestIn
            }
        case TodoActions.NEST_TODO_OUT:
            const nestOut = state.todos
            const Index = nestOut.findIndex(todo => todo.id === action.payload.todoId)
            if (Index === -1) {
                return state
            }

            nestOut[Index].parentTodoId = undefined
            return {
                ...state,
                todos: nestOut
            }

        default:
            return state;
    }
}
export default todoReducer;