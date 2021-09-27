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
      // Pretend we fetch the initial lists from a server, that's why we need an epic
      return loadListsSuccess(initialLists);
    })
  );

const listEpics = [loadLists$];

export default listEpics;