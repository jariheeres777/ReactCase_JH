import {ActionType} from "typesafe-actions";
import * as TodoActions from "../actions/Todo.action";
import {ITodoState} from "../containers/Todo.container";

type Actions = ActionType<typeof TodoActions>;

const initialState: ITodoState = {
    todos: []
};

const todoReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case TodoActions.LOAD_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload.todos
            };
        default:
            return state;
    }
};

export default todoReducer;