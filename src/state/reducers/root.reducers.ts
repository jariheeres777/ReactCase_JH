import { AnyAction, combineReducers } from "redux";
import { IListState } from "../containers/list.container";
import listReducer from "./list.reducers";

export type RootState = {
  readonly lists: IListState;
}

export const rootReducers = combineReducers({
  lists: listReducer
});

//tslint:disable-next-line:no-any
export const rootReducer = (state: any, action: AnyAction): any => {
  return rootReducers(state, action);
};