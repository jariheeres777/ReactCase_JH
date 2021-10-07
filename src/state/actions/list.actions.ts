import {createAction} from "typesafe-actions";
import {IList} from "../../model/interfaces/IList";

export const LOAD_LISTS = '[LIST] load';
export const LOAD_LISTS_SUCCESS = '[LIST] load success'
export const DELETE_LIST = '[LIST] delete';
export const CREATE_LIST = '[LIST] create'
export const UPDATE_LIST = '[LIST] update'
export const MOVE_LIST = '[LIST] move up'
export const SET_ACTIVE_LIST = '[LIST] active'

export const loadLists = createAction(LOAD_LISTS);

export const loadListsSuccess = createAction(LOAD_LISTS_SUCCESS, action =>
    (lists: IList[]) => action({lists})
);

export const deleteList = createAction(DELETE_LIST, action =>
    (listId: string) => action({listId})
);

export const addlist = createAction(CREATE_LIST, action =>
    (list: IList) => action({list})
);

export const updateList = createAction(UPDATE_LIST, action =>
    (list: IList) => action({list})
);
export const moveList = createAction(MOVE_LIST, action =>
    (list: IList, number: number) => action({list, number})
);
export const setActiveList = createAction(SET_ACTIVE_LIST, action =>
    (listId: string) => action({listId})
);