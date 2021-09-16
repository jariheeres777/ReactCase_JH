import { createAction } from "typesafe-actions";
import { IList } from "../../model/interfaces/IList";

export const LOAD_LISTS = '[LIST] load';
export const LOAD_LISTS_SUCCESS = '[LIST] load success'
export const DELETE_LIST = '[LIST] delete';

export const loadLists = createAction(LOAD_LISTS);

export const loadListsSuccess = createAction(LOAD_LISTS_SUCCESS, action =>
  (lists: IList[]) => action({ lists })
);

export const deleteList = createAction(DELETE_LIST, action =>
  (listId: string) => action({ listId })
);