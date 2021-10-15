import {
    List,
    Divider, Button
} from "@material-ui/core";
import React from "react";
import {compose} from "recompose";
import {ITodoState, ITodoActions, withTodos} from "../../state/containers/Todo.container";
import {IListActions, IListState, withLists} from "../../state/containers/list.container";
import ContentTodo from "./ContentTodo";
import {ITagActions, ITagState} from "../../state/containers/Tag.container";

interface IProps extends ITodoState, ITodoActions, IListState, IListActions, ITagState, ITagActions {

}

class ShowTodoItem extends React.Component<IProps> {
    render() {
        const {todos} = this.props
        const {lists} = this.props
        const activeListId = lists.filter(list => list.active ? list.id : null)
        return (
            <>
                <List>
                    {todos
                        .filter((todo) => todo.listId === activeListId[0].id)
                        .filter((todo) => todo.parentTodoId === undefined)
                        .sort((a, b) => a.order > b.order ? 1 : -1)
                        .map((todo) => (
                            <>
                                <ContentTodo todo={todo}/>
                                {todos
                                    .filter((todo2) => todo2.parentTodoId === todo.id)
                                    .sort((a, b) => a.order > b.order ? 1 : -1)
                                    .map((todo) => (
                                        <>
                                            <ContentTodo todo={todo}/>
                                        </>
                                    ))
                                }
                            </>
                        ))
                    }
                    <Divider/><br/>
                </List>
            </>
        );
    };
}

export default compose<IProps, {}>
(withTodos(), withLists())
(ShowTodoItem);