import {
    List,
    Divider
} from "@material-ui/core";
import React from "react";
import {compose} from "recompose";
import {ITodoState, ITodoActions, withTodos} from "../../state/containers/Todo.container";
import {IListActions, IListState, withLists} from "../../state/containers/list.container";
import ContentTodo from "./ContentTodo";

interface IProps extends ITodoState, ITodoActions, IListState, IListActions {

}

class ShowTodoItem extends React.Component<IProps> {
    render() {
        const {todos} = this.props
        const {lists} = this.props
        if (todos.length === 0) {
            return null;
        }
        const activeListId = lists.filter(list => list.active ? list.id : null)
        if (activeListId.length === 0 ){
            return null
        }
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
        )
    }
}

export default compose<IProps, {}>
(withTodos(), withLists())
(ShowTodoItem);