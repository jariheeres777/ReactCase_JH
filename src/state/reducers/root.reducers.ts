import { AnyAction, combineReducers } from "redux";
import { IListState } from "../containers/list.container";
import listReducer from "./list.reducers";
import {ITodoState} from "../containers/Todo.container";
import todoReducer from "./Todo.reducers";

export type RootState = {
  readonly lists: IListState;
  readonly todo:ITodoState
}

export const rootReducers = combineReducers({
  lists: listReducer,
  todo: todoReducer
});

//tslint:disable-next-line:no-any
export const rootReducer = (state: any, action: AnyAction): any => {
  return rootReducers(state, action);
};