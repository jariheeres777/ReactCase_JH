import {AnyAction, combineReducers} from "redux";
import {IListState} from "../containers/list.container";
import listReducer from "./list.reducers";
import {ITodoState} from "../containers/Todo.container";
import todoReducer from "./Todo.reducers";

export type RootState = {
    readonly lists: IListState;
    readonly todos: ITodoState
}

export const rootReducers = combineReducers({
    lists: listReducer,
    todos: todoReducer
});

//tslint:disable-next-line:no-any
export const rootReducer = (state: any, action: AnyAction): any => {
    return rootReducers(state, action);
};