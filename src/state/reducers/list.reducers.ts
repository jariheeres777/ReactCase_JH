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
                lists: state.lists.filter((e) => e.id !== action.payload.listId)
            };
        case ListActions.UPDATE_list:
            return {
                ...state,
                lists: state.lists.map((e) => {
                    if (e.id === action.payload.list.id) {
                        return action.payload.list
                    } else {
                        return e;
                    }
                })
            }
        case ListActions.MOVE_UP_LIST:
            return {
                ...state,
                lists: state.lists.map((e) => {
                    if (e.id === action.payload.list.id) {
                        const lists = {
                            order: action.payload.list.order - 1,
                            id: e.id,
                            name: e.name,
                            default: e.default,
                            color: e.color,
                            active:e.active
                        }

                        return lists
                    } else {
                        if (e.order === (action.payload.list.order - 1)) {
                            const order = {
                                order: action.payload.list.order,
                                id: e.id,
                                name: e.name,
                                default: e.default,
                                color: e.color,
                                active:e.active
                            }
                            return order
                        } else {
                            return e;
                        }
                    }
                })
            }
        case ListActions.MOVE_DOWN_LIST:
            return {
                ...state,
                lists: state.lists.map((e) => {
                    if (e.id === action.payload.list.id) {
                        const lists = {
                            order: action.payload.list.order + 1,
                            id: e.id,
                            name: e.name,
                            default: e.default,
                            color: e.color,
                            active:e.active
                        }
                        console.log(lists)
                        return lists
                    } else {
                        if (e.order === (action.payload.list.order +1 )) {
                            const order = {
                                order: action.payload.list.order,
                                id: e.id,
                                name: e.name,
                                default: e.default,
                                color: e.color,
                                active:e.active
                            }
                            console.log(order)
                            return order
                        } else {
                            return e;
                        }
                    }
                })
            }
        default:
            return state;
    }
};

export default listReducer;