import {ActionType} from "typesafe-actions";
import * as TagActions from "../actions/Tag.action";
import {ITagState} from '../containers/Tag.container'


type Actions = ActionType<typeof TagActions>

const initialState: ITagState = {
    tags: []
};

const tagReducer =(state =initialState,action:Actions):ITagState =>{
    switch (action.type) {
        case TagActions.LOAD_TAGS_SUCCESS:
            return {
                ...state,
                tags: action.payload.tags
            };
        default:
            return state;
    }
}
export default tagReducer;