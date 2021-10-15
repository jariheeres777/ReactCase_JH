import {IListState} from "../containers/list.container";
import * as ListActions from "../actions/list.actions";
import {ActionType} from "typesafe-actions";

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
        case ListActions.CREATE_LIST:
            return {
                ...state,
                lists: [
                    ...state.lists,
                    action.payload.list
                ]
            };
        case ListActions.DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter((list) => list.id !== action.payload.listId)
            };
        case ListActions.UPDATE_LIST:
            const updatedList = [...state.lists]
            const updatedindex = updatedList.findIndex(list => list.id === action.payload.list.id)
            if (updatedindex === -1) {
                return state
            }
            updatedList[updatedindex] = action.payload.list
            return {
                ...state,
                lists: updatedList
            };
        case ListActions.MOVE_LIST:
            const moveList = [...state.lists]
            const moveFromIndex = moveList.findIndex(list => list.id === action.payload.list.id)
            if (moveFromIndex === -1) {
                return state
            }
            const moveToIndex = moveList.findIndex(list => list.order === (action.payload.list.order + action.payload.number))
            if (moveToIndex === -1) {
                return state
            }
            moveList[moveFromIndex].order = moveList[moveToIndex].order
            moveList[moveToIndex].order = action.payload.list.order
            return {
                ...state,
                lists: moveList
            };
        case ListActions.SET_ACTIVE_LIST:
            const activeList = [...state.lists]
            const activeIndex = activeList.findIndex(list => list.id === action.payload.listId)
            const ID = activeList.findIndex(list => list.active)
            if (activeIndex === -1) {
                return state
            }
            if (ID === -1) {
                return state
            }
            activeList[ID].active = false
            activeList[activeIndex].active = true
            return {
                ...state,
                lists: activeList
            };
        default:
            return state;
    }
};

export default listReducer;