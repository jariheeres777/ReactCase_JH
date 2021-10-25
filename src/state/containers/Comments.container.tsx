import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../reducers/root.reducers';
import {IComments} from "../../model/interfaces/IComments";
import {
    loadComments,
    createComment
} from "../actions/Comments.actions";


export interface ICommentState {
    comments: IComments[];
}

export interface ICommentActions {
    loadComments(): void;

    createComment(comment: IComments):void;
}

function mapStateToProps(state: RootState) {
    return {comments: state.comments.comments};
}

const mapDispatchToProps: ICommentActions = {
    loadComments,
    createComment,
};

interface ICommentsProps extends ICommentState, ICommentActions {
}

export const withComments = () => (Component: React.ComponentType) => {
    class CommentsContainer extends React.PureComponent<ICommentsProps> {
        constructor(props: ICommentsProps) {
            super(props);
            if (props.comments.length === 0) {
                props.loadComments()
            }
        };

        public render() {
            return <Component {...this.props} />;
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
};