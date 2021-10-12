import {AnyAction} from 'redux';
import {Epic} from 'redux-observable';
import {filter, map} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';
import {RootState} from '../reducers/root.reducers';
import initialTags from '../../data/InitialTags'
import {loadTags, loadTagsSuccess} from "../actions/Tag.action";

export const loadTags$: Epic<AnyAction, AnyAction, RootState> = (
    action$,
    state$
) =>
    action$.pipe(
        filter(isActionOf(loadTags)),
        map((action: AnyAction) => {
            // Pretend we fetch the initial lists from a server, that's why we need an epic
            return loadTagsSuccess(initialTags);
        })
    );

const tagEpics = [loadTags$];
export default tagEpics;