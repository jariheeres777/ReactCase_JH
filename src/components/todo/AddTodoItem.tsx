import React from 'react';
import {compose} from "recompose";
import {ITodoActions, ITodoState, withTodos} from "../../state/containers/Todo.container";
import {Button, Input} from "@material-ui/core";
import {v4 as uuid} from 'uuid';
import {ITodo} from '../../model/interfaces/ITodo'
import {Priority} from '../../model/enums/priority';
import {IListActions, IListState, withLists} from "../../state/containers/list.container";

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
    }

    render() {
        return (
            <>
                <>
                    <Input
                        style={{width: "300px"}}
                        margin='dense'
                        placeholder="title"
                        value={this.state.title}
                        onChange={(event) => {
                            this.titleList(event)
                        }}
                    />
                </>
                <br/>
                <br/>
                <>
                    <Input
                        style={{width: "300px"}}
                        multiline={true}
                        rows={5}
                        margin='dense'
                        placeholder="description"
                        value={this.state.description}
                        onChange={(event) => {
                            this.descriptionList(event)
                        }}
                    />
                </>
                <br/>
                <br/>
                <Input type="Date"
                       value={this.state.date}
                       onChange={(event) => {
                           this.dateList(event)
                       }}/>
                <br/>
                <br/>
                <>
                    <Button variant="outlined"
                            onClick={() => {
                                this.addList()
                            }}>
                        confirm
                    </Button>
                    <Button variant="outlined"
                            onClick={()=>{
                                this.cancelList()
                            }}>
                        cancel
                    </Button>
                </>
            </>
        )
    }

    public titleList(event: any) {
        this.setState({title: event.target.value})
    }

    public descriptionList(event: any) {
        this.setState({description: event.target.value})
    }

    public dateList(event: any) {
        this.setState({date: event.target.value})
    }

    public addList() {
        const {todos,createTodo} = this.props;
        const {lists} = this.props;
        const filteredList = lists.filter(list => list.active ? list.id : null)
        let dateTime;
        if (this.state.date === '') {
            const dateTime = Date
        }
        const newTodo: ITodo = {
            id: uuid(),
            listId: filteredList[0].id,
            title: this.state.title,
            description: this.state.description,
            dueDate: dateTime,
            priority: Priority.Normal,
            complete: false,
            completedOn: undefined,
            order: todos.length + 1
        }
        createTodo(newTodo)
        this.cancelList()
    }

    public cancelList() {
        this.setState({
                date: '',
                title: '',
                description: ''
            }
        )

    }

}

export default compose<IProps, {}>
(withTodos(), withLists())
(AddTodoItem);