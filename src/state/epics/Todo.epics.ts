import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { loadTodos,loadTodosSucces} from '../actions/Todo.action'
import { RootState } from '../reducers/root.reducers';
import initialTodos from "../../data/todos";

export const loadTodos$: Epic<AnyAction, AnyAction, RootState> = (
    action$,
    state$
) =>
    action$.pipe(
        filter(isActionOf(loadTodos)),
        map((action: AnyAction) => {
            let localstoragestring =   localStorage.getItem('todo')
            if(localstoragestring === null){
                localStorage.setItem('todo', JSON.stringify(initialTodos));
            }
            localstoragestring = localStorage.getItem('todo')
            if(localstoragestring === null){
                return loadTodosSucces(initialTodos);
            }
            let todo = JSON.parse(localstoragestring)
            console.log(todo)
            return loadTodosSucces(todo);
        })
    );

const todoEpics = [loadTodos$];
export default todoEpics;