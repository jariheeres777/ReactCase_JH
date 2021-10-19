import {AnyAction} from 'redux';
import {Epic} from 'redux-observable';
import {filter, map} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';
import {RootState} from '../reducers/root.reducers';
import initialTags from '../../data/InitialTags'
import {loadTags, loadTagsSuccess} from "../actions/Tag.action";
import initialLists from "../../data/lists";

export const loadTags$: Epic<AnyAction, AnyAction, RootState> = (
    action$,
    state$
) =>
    action$.pipe(
        filter(isActionOf(loadTags)),
        map((action: AnyAction) => {
            let localstoragestring =   localStorage.getItem('tag')
            if(localstoragestring === null){
                localStorage.setItem('tag', JSON.stringify(initialTags));
            }
            localstoragestring =   localStorage.getItem('list')
            if(localstoragestring === null){
                return loadTagsSuccess(initialLists);
            }
            let tags = JSON.parse(localstoragestring)
            console.log(tags)
            return loadTagsSuccess(tags);
        })
    );

const tagEpics = [loadTags$];
export default tagEpics;