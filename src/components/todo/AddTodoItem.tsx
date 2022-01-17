import React from 'react';
import { compose } from "recompose";
import { ITodoActions, ITodoState, withTodos } from "../../state/containers/Todo.container";
import { Button, Input } from "@material-ui/core";
import { v4 as uuid } from 'uuid';
import { ITodo } from '../../model/interfaces/ITodo'
import { Priority } from '../../model/enums/priority';
import { IListActions, IListState, withLists } from "../../state/containers/list.container";

interface IProps extends ITodoState, ITodoActions, IListState, IListActions {

}

interface IState {
    description: string
    title: string
    date: string
}

class AddTodoItem extends React.Component<IProps, IState> {
    public state = {
        date: '',
        title: '',
        description: ''
    };
    render() {
        return (
            <>
                <>
                    <Input
                        className='todoText'
                        margin='dense'
                        placeholder="title"
                        value={this.state.title}
                        onChange={(event) => {
                            this.titleList(event)
                        }} />
                </>
                <br />
                <br />
                <>
                    <Input
                        className='todoText'
                        multiline={true}
                        rows={5}
                        margin='dense'
                        placeholder="description"
                        value={this.state.description}
                        onChange={(event) => {
                            this.descriptionList(event)
                        }} />
                </>
                <br />
                <br />
                <Input type="Date"
                    placeholder="dd-mm-yyyy"
                    onChange={(event) => {
                        this.dateList(event)
                    }} />
                <br />
                <br />
                <>
                    <Button variant="outlined"
                        disabled={this.state.title === '' || this.state.description === ''}
                        onClick={() => {
                            this.addList()
                        }}>
                        confirm
                    </Button>
                    <Button variant="outlined"
                        onClick={this.cancelList}>
                        cancel
                    </Button>
                </>
            </>
        );
    };

    private titleList(event: any) {
        this.setState({ title: event.target.value });
    };

    private descriptionList(event: any) {
        this.setState({ description: event.target.value });
    };

    private dateList(event: any) {
        const rifdrg = event.target.value;
        const date = rifdrg.toString().split("-").reverse().join("/");
        console.log(date)
        this.setState({ date: date });
    };

    private addList() {
        const { todos, lists } = this.props;
        const filteredList = lists.filter(list => list.active ? list.id : null);
        const filterdTodos = todos.filter(todo => todo.listId === filteredList[0].id);
        let order;
        if (filterdTodos === []) {
            order = 1
        } else {
            order = filterdTodos.length + 1;
        }
        let date;
        if (this.state.date === '') {
            date = undefined;
        } else {
            date = this.state.date;
        }
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser === null) {
            return;
        }
        const newTodo: ITodo = {
            id: uuid(),
            listId: filteredList[0].id,
            title: this.state.title,
            description: this.state.description,
            dueDate: date,
            priority: Priority.Normal,
            complete: false,
            completedOn: undefined,
            order: order,
            tags: [],
            user: loggedInUser
        };
        this.props.createTodo(newTodo);
        this.cancelList();
    };

    private cancelList() {
        this.setState({
            date: '',
            title: '',
            description: ''
        }
        );
    };
}

export default compose<IProps, {}>
    (withTodos(), withLists())
    (AddTodoItem);