import {
    Button,
    Checkbox,
    Input,
    ListItem,
    ListItemText,
    List,
    Divider
} from "@material-ui/core";
import React from "react";
import {compose} from "recompose";
import {ITodoState, ITodoActions, withTodos} from "../../state/containers/Todo.container";
import {ITodo} from "../../model/interfaces/ITodo";
import {IListActions, IListState, withLists} from "../../state/containers/list.container";

interface IProps extends ITodoState, ITodoActions, IListState, IListActions {

}

interface IState {
    inUpdate: boolean
    currentTodoAdjust: string
    newTodoName: string
}

class ShowTodoItem extends React.Component<IProps, IState> {
    public state = {
        inUpdate: false,
        currentTodoAdjust: '',
        newTodoName: '',
    }

    render() {
        const {todos} = this.props
        const {lists} = this.props
        if (todos.length === 0) {
            return null;
        }
        //filterds list for the active list
        return (
            <>
                <List>
                    {todos
                        .sort((a, b) => a.order > b.order ? 1 : -1)
                        .map((todo) => (
                            <ListItem button key={todo.id}
                                      onClick={(event) => {
                                      }}>
                                <Checkbox value={todo.complete}/>
                                {this.state.currentTodoAdjust !== todo.id &&
                                <>
                                    <div style={{width: "300px"}}>
                                        <ListItemText primary={todo.title}
                                        />
                                    </div>
                                    {todo.parentTodoId === undefined &&
                                    <Button variant="contained"
                                            disabled={false}
                                    >
                                        🡺|
                                    </Button>
                                    }
                                    {todo.parentTodoId !== undefined &&
                                    <Button variant="contained">
                                        |🡸
                                    </Button>
                                    }
                                    <Button variant="contained"
                                            onClick={(event) => {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                this.moveDownTodo(todo)
                                            }
                                            }>
                                        🡹
                                    </Button>
                                    <Button variant="contained"
                                            onClick={(event) => {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                this.moveUpTodo(todo)
                                            }}>
                                        🡻
                                    </Button>
                                    <Button variant="contained"
                                            onClick={(event) => {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                this.inUpdateTodo(todo.id)
                                            }
                                            }>✐
                                    </Button>
                                    <Button variant="contained"
                                            onClick={(event) => {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                this.deleteTodo(todo.id)
                                            }
                                            }>❌
                                    </Button>
                                </>
                                }
                                {this.state.currentTodoAdjust === todo.id &&
                                <>
                                    <div style={{width: "300px"}}>
                                        <Input value={this.state.newTodoName}
                                               onChange={(event) => {
                                                   this.nameTodo(event)
                                               }
                                               }
                                        />
                                    </div>
                                    <Button variant="contained"
                                            onClick={(event) => {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                this.updateTodo(todo)
                                            }
                                            }>confirm
                                    </Button>
                                    <Button variant="contained"
                                            onClick={(event) => {
                                                this.cancelUpdateTodo(event)
                                            }
                                            }>cancel
                                    </Button>
                                </>
                                }
                            </ListItem>
                        ))
                    }
                    <Divider/><br/>
                </List>
            </>
        )
    }

    public toggleUpdate() {
        this.setState({inUpdate: this.state.inUpdate})
    }

    public moveDownTodo(event: any) {
        const newTodo: ITodo = {
            id: event.id,
            listId: event.listId,
            title: event.title,
            description: event.description,
            dueDate: event.dueDate,
            priority: event.priority,
            complete: event.complete,
            completedOn: event.completedOn,
            order: event.order
        }
        const number = -1
        this.props.moveTodo(newTodo, number)
    }

    public moveUpTodo(event: any) {
        const newTodo: ITodo = {
            id: event.id,
            listId: event.listId,
            title: event.title,
            description: event.description,
            dueDate: event.dueDate,
            priority: event.priority,
            complete: event.complete,
            completedOn: event.completedOn,
            order: event.order
        }
        const number = 1
        this.props.moveTodo(newTodo, number)
    }

    public inUpdateTodo(event: any) {
        this.toggleUpdate()
        this.setState({currentTodoAdjust: event})
    }

    public deleteTodo(event: any) {
        this.props.deleteTodo(event)
    }

    public nameTodo(event: any) {
        this.setState({newTodoName: event.target.value})
    }

    public updateTodo(event: any) {
        const newTodo: ITodo = {
            id: event.id,
            listId: event.listId,
            title: this.state.newTodoName,
            description: event.description,
            dueDate: event.dueDate,
            priority: event.priority,
            complete: event.complete,
            completedOn: event.completedOn,
            order: event.order
        }
        this.props.updateTodo(newTodo)
        this.setState({currentTodoAdjust: ''})
        this.toggleUpdate()
    }

    public cancelUpdateTodo(event: any) {
        event.stopPropagation()
        event.preventDefault()
        this.setState({currentTodoAdjust: ''})
        this.toggleUpdate()
    }

}

export default compose<IProps, {}>
(withTodos(), withLists())
(ShowTodoItem);