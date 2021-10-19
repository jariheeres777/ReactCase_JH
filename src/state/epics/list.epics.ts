import { AnyAction } from 'redux';
import { Epic } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { loadLists, loadListsSuccess } from '../actions/list.actions';
import { RootState } from '../reducers/root.reducers';
import initialLists from '../../data/lists';

export const loadLists$: Epic<AnyAction, AnyAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(loadLists)),
    map((action: AnyAction) => {
        let localstoragestring =   localStorage.getItem('list')
        if(localstoragestring === null){
            localStorage.setItem('list', JSON.stringify(initialLists));
        }
        localstoragestring =   localStorage.getItem('list')
        if(localstoragestring === null){
            return loadListsSuccess(initialLists);
        }
        let lists = JSON.parse(localstoragestring)
        console.log(lists)
        return loadListsSuccess(lists);
    })
  );

const listEpics = [loadLists$];

export default listEpics;