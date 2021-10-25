import {ActionType} from "typesafe-actions";
import {ICommentState} from "../containers/Comments.container";
import * as CommentsAction from "../actions/Comments.actions"

type Actions = ActionType<typeof CommentsAction>;

const initialState: ICommentState = {
    comments: []
};

const commentsReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case CommentsAction.LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload.comments
            };
        case CommentsAction.CREATE_COMMENT:
            const newCommentArray = [...state.comments, action.payload.comment]
            localStorage.setItem('comments', JSON.stringify(newCommentArray));
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.payload.comment
                ]
            };
        default:
            return state;
    }
};

export default commentsReducer;