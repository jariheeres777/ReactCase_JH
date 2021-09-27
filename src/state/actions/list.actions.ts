import {createAction} from "typesafe-actions";
import {IList} from "../../model/interfaces/IList";

export const LOAD_LISTS = '[LIST] load';
export const LOAD_LISTS_SUCCESS = '[LIST] load success'
export const DELETE_LIST = '[LIST] delete';
export const CREATE_LIST = '[LIST] create'
export const UPDATE_list = '[LIST] update'
export const MOVE_UP_LIST = '[LIST] move up'
export const MOVE_DOWN_LIST = '[LIST] move down'
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

export const updateList = createAction(UPDATE_list, action =>
    (list: IList) => action({list})
);
export const moveUpList = createAction(MOVE_UP_LIST, action =>
    (list: IList) => action({list})
);
export const moveDownList = createAction(MOVE_DOWN_LIST, action =>
    (list: IList) => action({list})
);
export const setActiveList = createAction(SET_ACTIVE_LIST, action =>
    (listId: string) => action({listId})
);