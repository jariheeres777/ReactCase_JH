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
            return {
                ...state,
                lists:  state.lists.map((e) => {
                    if (e.id === action.payload.list.id) {
                        return action.payload.list
                    } else {
                        return e;
                    }
                })
            }
        case ListActions.MOVE_LIST:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    console.log(action.payload.number.valueOf())
                    if (list.id === action.payload.list.id) {
                        const lists = {
                            order: action.payload.list.order + action.payload.number.valueOf(),
                            id: list.id,
                            name: list.name,
                            default: list.default,
                            color: list.color,
                            active: list.active
                        }
                        return lists
                    } else {
                        if (list.order === (action.payload.list.order + action.payload.number.valueOf())) {
                            const order = {
                                order: action.payload.list.order,
                                id: list.id,
                                name: list.name,
                                default: list.default,
                                color: list.color,
                                active: list.active
                            }
                            return order
                        } else {
                            return list;
                        }
                    }
                })
            }
        case ListActions.SET_ACTIVE_LIST:
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if (list.id === action.payload.listId) {
                        const lists = {
                            order: list.order,
                            id: list.id,
                            name: list.name,
                            default: list.default,
                            color: list.color,
                            active: true
                        }
                        return lists
                    } else {
                        const order = {
                            order: list.order,
                            id: list.id,
                            name: list.name,
                            default: list.default,
                            color: list.color,
                            active: false
                        }
                        return order
                    }
                })
            }
        default:
            return state;
    }
};

export default listReducer;