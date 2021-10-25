import {createAction} from "typesafe-actions";
import {ITag} from "../../model/interfaces/ITag";

export const LOAD_TAGS = '[tag] load';
export const LOAD_TAGS_SUCCESS = '[tag] load success';
export const CREATE_TAG = '[tag] create tag';
export const DELETE_TAG = '[tag] delete tag';
export const UPDATE_TAG = '[tag] update tag';

export const loadTags = createAction(LOAD_TAGS);

export const loadTagsSuccess = createAction(LOAD_TAGS_SUCCESS, action =>
    (tags: ITag[]) => action({tags}));

export const createTag = createAction(CREATE_TAG, action =>
    (tags: ITag) => action({tags}));

export const deleteTag = createAction(DELETE_TAG, action=>
    (tagid: string) => action({tagid}));

export const updateTag = createAction(UPDATE_TAG, action=>
    (tags: ITag) => action({tags}));
