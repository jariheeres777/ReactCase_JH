import {ITodoState} from "../containers/Todo.container";
import * as TodoActions from "../actions/Todo.action";
import {ActionType} from "typesafe-actions";

type Actions = ActionType<typeof TodoActions>

const initialState: ITodoState = {
    todos: []
};

const todoReducer = (state = initialState, action: Actions): ITodoState => {
    switch (action.type) {
        case TodoActions.LOAD_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload.todos
            };
        case TodoActions.CREATE_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload.todos
                ]
            };
        case TodoActions.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.todoId)
            };
        case TodoActions.UPDATE_TODO:
            const updatedList = [...state.todos]
            const index = updatedList.findIndex(todo => todo.id === action.payload.todos.id)
            if (index === -1) {
                return state
            }
            updatedList[index] = action.payload.todos
            return {
                ...state,
                todos: updatedList
            };
        case TodoActions.NEST_TODO:
            let parentState
            const nestIn = [...state.todos]
            const I = nestIn.findIndex(todo => todo.id === action.payload.todoIdChild)
            if (I === -1) {
                return state
            }
            if (action.payload.todoIdParent === '') {
                parentState = undefined
            } else {
                parentState = action.payload.todoIdParent
            }
            nestIn[I].parentTodoId = parentState
            return {
                ...state,
                todos: nestIn
            };
        case TodoActions.MOVE_TODO:
            const newTodos = [...state.todos]

            const moveFromIndex = newTodos.findIndex(todo => todo.id === action.payload.todo.id)
            if (moveFromIndex === -1) {
                return state
            }
            const moveToIndex = moveFromIndex + action.payload.number;
            newTodos[moveFromIndex].order = newTodos[moveToIndex].order
            newTodos[moveToIndex].order = action.payload.todo.order
            return {
                ...state,
                todos: newTodos
            };
        case TodoActions.COMPLETED_TODO:
            const completed = [...state.todos]
            const completedIndex = completed.findIndex(todo => todo.id === action.payload.todoId)
            if(completedIndex === -1){
                return state
            }
            if(completed[completedIndex].complete){
                completed[completedIndex].completedOn = undefined
            }else{
                completed[completedIndex].completedOn = new Date().toString()
            }
            completed[completedIndex].complete = !completed[completedIndex].complete


            return {
                ...state,
                todos: completed
            }
        default:
            return state;
    }
}
export default todoReducer;