import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { loadTodos,loadTodosSucces} from '../actions/Todo.action'
import { RootState } from '../reducers/root.reducers';
import initialTododos from '../../data/todos';

export const loadTodos$: Epic<AnyAction, AnyAction, RootState> = (
    action$,
    state$
) =>
    action$.pipe(
        filter(isActionOf(loadTodos)),
        map((action: AnyAction) => {
            // Pretend we fetch the initial lists from a server, that's why we need an epic
            return loadTodosSucces(initialTododos);
        })
    );

const todoEpics = [loadTodos$];
export default todoEpics;