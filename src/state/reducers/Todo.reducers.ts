import {ITodoState} from "../containers/Todo.container";
import * as TodoActions from "../actions/Todo.action";
import {ActionType, createAction} from "typesafe-actions";


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
            const updateIndex = updatedList.findIndex(todo => todo.id === action.payload.todos.id)
            if (updateIndex === -1) {
                return state
            }
            updatedList[updateIndex] = action.payload.todos
            return {
                ...state,
                todos: updatedList
            };
        case TodoActions.NEST_TODO:
            let parentState
            const nestIn = [...state.todos]
            const nestIndex = nestIn.findIndex(todo => todo.id === action.payload.todoIdChild)
            if (nestIndex === -1) {
                return state
            }
            if (action.payload.todoIdParent === '') {
                parentState = undefined
            } else {
                parentState = action.payload.todoIdParent
            }
            nestIn[nestIndex].parentTodoId = parentState
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
            const notNested = newTodos.filter(todo => todo.parentTodoId === undefined)
            const moveToId = notNested.find(list => list.order === (action.payload.todo.order + action.payload.number))
            if (moveToId === undefined) {
                return state
            }
            const moveToIndex = newTodos.findIndex(list => list.id === moveToId.id)
            if (moveToIndex === -1) {
                return state
            }
            newTodos[moveFromIndex].order = newTodos[moveToIndex].order
            newTodos[moveToIndex].order = action.payload.todo.order
            return {
                ...state,
                todos: newTodos
            };
        case TodoActions.COMPLETED_TODO:
            const completed = [...state.todos]
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            const date = dd + '/' + mm + '/' + yyyy;
            const completedIndex = completed.findIndex(todo => todo.id === action.payload.todoId)
            if (completedIndex === -1) {
                return state
            }
            if (completed[completedIndex].complete) {
                completed[completedIndex].completedOn = undefined
            } else {
                completed[completedIndex].completedOn = date
            }
            completed[completedIndex].complete = !completed[completedIndex].complete
            return {
                ...state,
                todos: completed
            };
        case TodoActions.DELETE_TAG_TODO:
            const deletedTagTodo = [...state.todos]
            const DeleteTagTodoIndex = deletedTagTodo.findIndex(todo => todo.id === action.payload.todoId)
            if (DeleteTagTodoIndex === -1) {
                return state
            }
            const romoveIndex = deletedTagTodo[DeleteTagTodoIndex].tags?.findIndex(tag => tag === action.payload.tagId)
            if (romoveIndex === -1) {
                return state
            }
            if (romoveIndex != null) {
                deletedTagTodo[DeleteTagTodoIndex].tags?.splice(romoveIndex, 1)
            }
            return {
                ...state,
                todos: deletedTagTodo
            };
        case TodoActions.ADD_TAG_TODO:
            const addTagTodo = [...state.todos]
            const addTagTodoIndex = addTagTodo.findIndex(todo => todo.id === action.payload.todoId)
            if (addTagTodoIndex === -1) {
                return state
            }
            addTagTodo[addTagTodoIndex].tags?.push(action.payload.tagId)
            return {
                ...state,
                todos: addTagTodo
            };
        case TodoActions.DELETE_TAG_ALL_TODO:
            const deleteAllTagTodo = [...state.todos]
            const tf = deleteAllTagTodo.map(todo => todo.tags?.filter(tag => tag !== action.payload.tagId))
            for (let i = 0; i < tf.length; i++) {
                deleteAllTagTodo[i].tags = tf[i]
            }
            return {
                ...state,
                todos: deleteAllTagTodo
            }
        case TodoActions.DELETE_ALL_TODO_LIST:{
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.listId !== action.payload.listid)
            };
        }
        default:
            return state;
    }
};
export default todoReducer;