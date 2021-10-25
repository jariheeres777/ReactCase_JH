import {createAction} from "typesafe-actions";
import {IComments} from "../../model/interfaces/IComments";

export const LOAD_COMMENTS = '[comment] load';
export const LOAD_COMMENTS_SUCCESS = '[comment] load success';
export const CREATE_COMMENT = '[comment] create comment';

export const loadComments = createAction(LOAD_COMMENTS);

export const loadCommentsSuccess = createAction(LOAD_COMMENTS_SUCCESS, action =>
    (comments: IComments[]) => action({comments}));

export const createComment = createAction(CREATE_COMMENT, action =>
    (comment: IComments) => action({comment}));