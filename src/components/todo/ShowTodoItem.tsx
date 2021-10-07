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
import todos from "../../data/todos";

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
                                                onClick={(event) => {
                                                    this.nestInto(todo)
                                                }
                                                }
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
                                {todos
                                    .filter((todo2) => todo2.parentTodoId === todo.id)
                                    .sort((a, b) => a.order > b.order ? 1 : -1)
                                    .map((todo) => (

                                        <ListItem button key={todo.id}
                                                  onClick={(event) => {
                                                  }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-arrow-return-right"
                                                 viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                      d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                                            </svg>
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
                                                        onClick={(event) => {
                                                            this.nestInto(todo)
                                                        }
                                                        }
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
                            </>
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

    public nestInto(event: any) {

        const index = todos.findIndex(todo => todo.id === event.id)
        const todoId = todos[index - 1].id
        this.props.nestTodoInto(todoId, event.id)
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