import React from "react";
import {ITodoActions, ITodoState, withTodos} from "../../state/containers/Todo.container";
import {ITagActions, ITagState, withTags} from "../../state/containers/Tag.container";
import {compose} from "recompose";
import Chip from "@material-ui/core/Chip";
import {ITag} from "../../model/interfaces/ITag";
import {ITodo} from "../../model/interfaces/ITodo";

interface Iouterprops {
    tag: ITag
    todo: ITodo
}

interface IProps extends Iouterprops, ITodoState, ITodoActions, ITagState, ITagActions {

}

interface IState {
    inUpdate: boolean
}

class tsxTagsTodo extends React.Component<IProps, IState> {
    render() {
        const tag = this.props
        const todo = this.props
        return (
            <>
                <Chip
                    style={{background: tag.tag.color}}
                    onDelete={this.handleDeleteTag.bind(this, todo.todo.id).bind(this, tag.tag.id)}
                    label={tag.tag.name}
                    variant="outlined"
                />
            </>
        );
    };
    public handleDeleteTag(todoid: string, tagid: string) {
        this.props.deleteTagTodo(todoid, tagid)
    };
}

export default compose<IProps, Iouterprops>
(withTodos(), withTags())
(tsxTagsTodo);