import {AnyAction, combineReducers} from "redux";
import {IListState} from "../containers/list.container";
import listReducer from "./list.reducers";
import {ITodoState} from "../containers/Todo.container";
import todoReducer from "./Todo.reducers";
import {ITagState} from "../containers/Tag.container";
import tagReducer from "./Tag.reducer";
import {ICommentState} from "../containers/Comments.container";
import commentsReducer from "./Comments.reducer";

export type RootState = {
    readonly lists: IListState;
    readonly todos: ITodoState;
    readonly tags: ITagState;
    readonly comments: ICommentState;
};

export const rootReducers = combineReducers({
    lists: listReducer,
    todos: todoReducer,
    tags: tagReducer,
    comments: commentsReducer
});

//tslint:disable-next-line:no-any
export const rootReducer = (state: any, action: AnyAction): any => {
    return rootReducers(state, action);
};