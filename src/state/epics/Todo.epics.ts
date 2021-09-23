import {filter, map} from "rxjs/operators";
import {loadTodos,loadTodoSuccess} from "../actions/Todo.action";
import {Epic} from "redux-observable";
import {RootState} from "../reducers/root.reducers";
import {AnyAction} from "redux";
import {isActionOf} from "typesafe-actions";
import initialTodos from "../../data/todos";



export const loadTodo$: Epic<AnyAction, AnyAction, RootState> = (
    action$,
    state$
) =>
    action$.pipe(
        filter(isActionOf(loadTodos)),
        map((action: AnyAction) => {
            // Pretend we fetch the initial lists from a server, that's why we need an epic
            return loadTodoSuccess(initialTodos);
        })
    );

const todoEpics = [loadTodo$];

export default todoEpics;