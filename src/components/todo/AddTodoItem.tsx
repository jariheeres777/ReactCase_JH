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
                        className='todoText'
                        margin='dense'
                        placeholder="title"
                        value={this.state.title}
                        onChange={(event)=>{
                            this.titleList(event)
                        }}
                    />
                </>
                <br/>
                <br/>
                <>
                    <Input
                        className='todoText'
                        multiline={true}
                        rows={5}
                        margin='dense'
                        placeholder="description"
                        value={this.state.description}
                        onChange={(event)=>{
                            this.descriptionList(event)
                        }}/>
                </>
                <br/>
                <br/>
                <Input type="Date"
                       value={this.state.date}
                       onChange={(event)=>{
                           this.dateList(event)
                       }}/>
                <br/>
                <br/>
                <>
                    <Button variant="outlined"
                            onClick={this.addList}>
                        confirm
                    </Button>
                    <Button variant="outlined"
                            onClick={this.cancelList}>
                        cancel
                    </Button>
                </>
            </>
        )
    }

    private titleList(event: any) {
        this.setState({title: event.target.value})
    }

    private descriptionList(event: any) {
        this.setState({description: event.target.value})
    }

    private dateList(event: any) {
        const date = event.target.value.toLocaleString().split(',')[0]
        this.setState({date: date})
    }

    private addList() {
        const {todos,lists} = this.props;
        const filteredList = lists.filter(list => list.active ? list.id : null)
        const filterdTodos = todos.filter(todo => todo.listId === filteredList[0].id)
        const listarrayorder = Math.max.apply(Math, filterdTodos.map(function(todo) { return todo.order }))
        const newTodo: ITodo = {
            id: uuid(),
            listId: filteredList[0].id,
            title: this.state.title,
            description: this.state.description,
            dueDate: this.state.date,
            priority: Priority.Normal,
            complete: false,
            completedOn: undefined,
            order: listarrayorder + 1,
            tags:[]
        }
        this.props.createTodo(newTodo)
        this.cancelList()
    }

    private cancelList() {
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