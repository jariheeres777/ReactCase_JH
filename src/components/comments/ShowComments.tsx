import React from "react";
import {ICommentActions, ICommentState, withComments} from "../../state/containers/Comments.container";
import {compose} from "recompose";
import {IComments} from "../../model/interfaces/IComments";
import {ListItemText} from "@material-ui/core";

interface Iouterprops {
    comment: IComments
}

interface IProps extends ICommentActions, ICommentState, Iouterprops {
}

class ShowComments extends React.Component<IProps> {

    render() {
        const {comment} = this.props
        return (
            <>
                <div className='todoDate'
                     style={{margin: '10px'}}>
                    <ListItemText primary={comment.comment}/>
                    <ListItemText primary={comment.date}/>
                </div>
            </>
        );
    };
}

export default compose<IProps, Iouterprops>
(withComments())
(ShowComments);