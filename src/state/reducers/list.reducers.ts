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
            const newlistArray = [...state.lists, action.payload.list]
            localStorage.setItem('lists', JSON.stringify(newlistArray));
            return {
                ...state,
                lists: [
                    ...state.lists,
                    action.payload.list
                ]
            };
        case ListActions.DELETE_LIST:
            localStorage.setItem('lists', JSON.stringify(state.lists.filter((list) => list.id !== action.payload.listId)));
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
            localStorage.setItem('lists', JSON.stringify(updatedList));
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
            localStorage.setItem('lists', JSON.stringify(moveList));
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
            localStorage.setItem('lists', JSON.stringify(activeList));
            return {
                ...state,
                lists: activeList
            };
        case ListActions.SET_PUBLIC_LIST:
            const newPublicList = [...state.lists]
            const indexPublicList = newPublicList.findIndex(list => list.id === action.payload.listId)
            newPublicList[indexPublicList].private = false
            return {
                ...state,
                lists: newPublicList
            };
        default:
            return state;
    }
};

export default listReducer;