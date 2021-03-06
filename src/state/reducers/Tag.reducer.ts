import {ActionType} from "typesafe-actions";
import * as TagActions from "../actions/Tag.action";
import {ITagState} from '../containers/Tag.container'

type Actions = ActionType<typeof TagActions>

const initialState: ITagState = {
    tags: []
};

const tagReducer = (state = initialState, action: Actions): ITagState => {
    switch (action.type) {
        case TagActions.LOAD_TAGS_SUCCESS:
            return {
                ...state,
                tags: action.payload.tags
            };
        case TagActions.CREATE_TAG:
            const newTagsArray = [...state.tags, action.payload.tags]
            localStorage.setItem('tags', JSON.stringify(newTagsArray));
            return {
                ...state,
                tags: [
                    ...state.tags,
                    action.payload.tags
                ]
            };
        case TagActions.DELETE_TAG:
            localStorage.setItem('tags', JSON.stringify(state.tags.filter((tag)=> tag.id !== action.payload.tagid)));
            return {
                ...state,
                tags: state.tags.filter((tag)=> tag.id !== action.payload.tagid)
            };
        case TagActions.UPDATE_TAG:
            const updateTag = [...state.tags]
            const updateIndex = updateTag.findIndex(tag => tag.id === action.payload.tags.id)
            if (updateIndex === -1) {
                return state
            }
            updateTag[updateIndex] = action.payload.tags
            localStorage.setItem('tags', JSON.stringify(updateTag));
            return {
                ...state,
                tags:updateTag
            };
        default:
            return state;
    }
};
export default tagReducer;