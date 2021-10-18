import {
    List,
    Divider,
} from "@material-ui/core";
import React from "react";
import {compose} from "recompose";
import {ITodoState, ITodoActions, withTodos} from "../../state/containers/Todo.container";
import {IListActions, IListState, withLists} from "../../state/containers/list.container";
import ContentTodo from "./ContentTodo";
import {ITagActions, ITagState} from "../../state/containers/Tag.container";
import {ITodo} from "../../model/interfaces/ITodo";
import {not} from "rxjs/internal-compatibility";

interface IProps extends ITodoState, ITodoActions, IListState, IListActions, ITagState, ITagActions {

}

class ShowTodoItem extends React.Component<IProps> {
    render() {
        const {todos} = this.props
        const {lists} = this.props
        const activeListId = lists.filter(list => list.active ? list.id : null)
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        const date = dd + '/' + mm + '/' + yyyy;
        //filters all the todo's with a duedate
        const hashDuedate = todos.filter((todo) => todo.dueDate !== undefined)
        //@ts-ignore
        // filterd the todo's so there duedate is not in the past
        const isNotOverdue = hashDuedate.filter((todo) => todo.dueDate >= date)
        //@ts-ignore
        // sorted the todo's on date from lowest to highest
        const sortedisNotOverdue = isNotOverdue.sort((a, b) => a.dueDate > b.dueDate ? 1 : -1)
        let uniqueDuedateId: string[] = []
        let distinct: string[] = []
        for (let i = 0; i < sortedisNotOverdue.length; i++)
            //@ts-ignore
            if (!distinct.includes(sortedisNotOverdue[i].dueDate)) {
                //@ts-ignore
                distinct.push(sortedisNotOverdue[i].dueDate)
                uniqueDuedateId.push(sortedisNotOverdue[i].id)
            }

        console.log(uniqueDuedateId)

        //@ts-ignore
        // filterd the todo's so there duedate is in the past
        const isOverdue = hashDuedate.filter((todo) => todo.dueDate < date)
        //@ts-ignore
        // sorted the todo's on date from lowest to highest
        const sortedIsOverdue = isOverdue.sort((a, b) => a.dueDate > b.dueDate ? 1 : -1)

        return (
            <>
                {activeListId[0].id !== 'default_list_upcoming' &&
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
                }
                {activeListId[0].id === 'default_list_upcoming' &&
                <List>
                    {sortedisNotOverdue
                        //@ts-ignore
                        .map((todo) => (
                            <>{uniqueDuedateId.includes(todo.id) &&
                            < h2>
                                {todo.dueDate}
                            </h2>
                            }
                                <ContentTodo todo={todo}/>
                            </>
                        ))
                    }
                    <h2>
                        overdue
                    </h2>
                    <Divider/><br/>
                    {sortedIsOverdue
                        .map((todo) => (
                            <>
                                <ContentTodo todo={todo}/>
                            </>
                        ))
                    }
                </List>
                }
            </>
        );
    };
}

export default compose<IProps, {}>
(withTodos(), withLists())
(ShowTodoItem);