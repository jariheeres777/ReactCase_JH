import {createAction} from "typesafe-actions";
import {ITag} from "../../model/interfaces/ITag";

export const LOAD_TAGS = '[tag] load'
export const LOAD_TAGS_SUCCESS = '[tag] load success'


export const loadTags = createAction(LOAD_TAGS);

export const loadTagsSuccess = createAction(LOAD_TAGS_SUCCESS, action =>
    (tags: ITag[]) => action({tags}));