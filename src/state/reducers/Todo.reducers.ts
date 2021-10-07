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
            const moveList = state.todos
            const moveFromIndex = moveList.findIndex(todo => todo.id === action.payload.todo.id)
            if (moveFromIndex === -1) {
                return state
            }
            const moveToIndex = moveList.findIndex(todo => todo.order === (action.payload.todo.order + action.payload.number))
            if (moveToIndex === -1) {
                return state
            }
            const newOrder = {
                id: action.payload.todo.id,
                listId: action.payload.todo.listId,
                title: action.payload.todo.title,
                description: action.payload.todo.description,
                dueDate: action.payload.todo.dueDate,
                priority: action.payload.todo.priority,
                complete: action.payload.todo.complete,
                completedOn: action.payload.todo.completedOn,
                order: moveList[moveToIndex].order
            }
            const oldOrder = {
                id: moveList[moveToIndex].id,
                listId: moveList[moveToIndex].listId,
                title: moveList[moveToIndex].title,
                description: moveList[moveToIndex].description,
                dueDate: moveList[moveToIndex].dueDate,
                priority:moveList[moveToIndex].priority,
                complete: moveList[moveToIndex].complete,
                completedOn: moveList[moveToIndex].completedOn,
                order: action.payload.todo.order,
            }
            moveList[moveFromIndex] = newOrder
            moveList[moveToIndex] = oldOrder
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
            console.log(I)
            if (I === -1) {
                return state
            }
            nestIn[I].parentTodoId = action.payload.todoIdParent
            console.log(nestIn)
            return {
                ...state,
                todos: nestIn
            }
        default:
            return state;
    }
}
export default todoReducer;