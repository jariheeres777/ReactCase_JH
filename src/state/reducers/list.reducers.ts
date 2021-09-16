import { IListState } from "../containers/list.container";
import * as ListActions from "../actions/list.actions";
import { ActionType } from "typesafe-actions";

type Actions = ActionType<typeof ListActions>;

const initialState: IListState = {
  lists: []
};

const listReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ListActions.LOAD_LISTS_SUCCESS:
      return {
        ...state,
        lists: action.payload.lists
      };
    default:
      return state;
  }
};

export default listReducer;