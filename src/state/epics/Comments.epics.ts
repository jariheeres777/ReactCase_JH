import {Epic} from "redux-observable";
import {AnyAction} from "redux";
import {RootState} from "../reducers/root.reducers";
import {filter, map} from "rxjs/operators";
import {isActionOf} from "typesafe-actions";
import initialComments from "../../data/comments";
import {loadCommentsSuccess, loadComments} from "../actions/Comments.actions";

export const loadComments$: Epic<AnyAction, AnyAction, RootState> = (
    action$,
    state$
) =>
    action$.pipe(
        filter(isActionOf(loadComments)),
        map((action: AnyAction) => {
            let localstoragestring = localStorage.getItem('comments');
            if (localstoragestring === null) {
                localStorage.setItem('comments', JSON.stringify(initialComments));
            }
            localstoragestring = localStorage.getItem('comments');
            if (localstoragestring === null) {
                return loadCommentsSuccess(initialComments);
            }
            let comments = JSON.parse(localstoragestring);

            return loadCommentsSuccess(comments);
        })
    );

const commentsEpics = [loadComments$];
export default commentsEpics;