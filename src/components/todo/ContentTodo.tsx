import {
    Button,
    Checkbox,
    Input,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import React from "react";
import {compose} from "recompose";
import {ITodoState, ITodoActions, withTodos} from "../../state/containers/Todo.container";
import {ITodo} from "../../model/interfaces/ITodo";
import {IListActions, IListState, withLists} from "../../state/containers/list.container";
import todos from "../../data/todos";
import lists from "../../data/lists";

interface Iouterprops {
    todo: ITodo
}

interface IProps extends ITodoState, ITodoActions, IListState, IListActions, Iouterprops {

}

interface IState {
    inUpdate: boolean
    currentTodoAdjust: string
    newTodoName: string
}

class ContentTodo extends React.Component<IProps, IState> {
    public state = {
        inUpdate: false,
        currentTodoAdjust: '',
        newTodoName: '',
    }

    render() {
        const {todos} = this.props
        const {todo} = this.props
        if (todos.length === 0) {
            return null;
        }
        const filteredList = lists.filter(list => list.active ? list.id : null)
        const filterdTodos = todos.filter(todo => todo.listId === filteredList[0].id)
        const listarrayorder = Math.max.apply(Math, filterdTodos.map(function(todo) { return todo.order }))
        return (
            <>
                <ListItem button key={todo.id}>
                    {todo.parentTodoId !== undefined &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                         fill="currentColor" className="bi bi-arrow-return-right"
                         viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                    </svg>
                    }
                    <Checkbox value={todo.complete}
                              onClick={this.handleCompleteTodo.bind(this, todo.id)}/>
                    {this.state.currentTodoAdjust !== todo.id &&
                    <>
                        <div style={{width: "300px"}}>
                            <ListItemText primary={todo.title}
                            />
                        </div>
                        {todo.parentTodoId === undefined &&
                        <Button variant="contained"
                                disabled={todo.order === 1}
                                onClick={(event) => {
                                    this.nestInto(todo)
                                }
                                }
                        >
                            🡺|
                        </Button>
                        }
                        {todo.parentTodoId !== undefined &&
                        <Button variant="contained"
                                onClick={(event) => {
                                    this.nestOut(todo.id)
                                }
                                }>
                            |🡸
                        </Button>
                        }
                        <Button variant="contained"
                                disabled={todo.order === 1}
                                onClick={(event) => {
                                    this.moveDownTodo(todo)
                                }
                                }>
                            🡹
                        </Button>
                        <Button variant="contained"
                                disabled={todo.order === listarrayorder}
                                onClick={(event) => {
                                    this.moveUpTodo(todo)
                                }}>
                            🡻
                        </Button>
                        <Button variant="contained"
                                onClick={(event) => {
                                    this.inUpdateTodo(todo.id)
                                }
                                }>✐
                        </Button>
                        <Button variant="contained"
                                onClick={(event) => {
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
            </>
        )
    }

    private toggleUpdate() {

        this.setState({
            inUpdate: this.state.inUpdate,
            newTodoName: ''
        })
    }

    private handleCompleteTodo(listid: string) {
        this.props.completedTodo(listid)
    }

    private nestInto(event: any) {

        const activeList = lists.filter(list => list.active ? list.id : null)
        const activeTodos = todos.filter(todo => todo.listId === activeList[0].id)
        const listNotnested = activeTodos.filter(todo => todo.parentTodoId === undefined ? todo.id : null)
        const index = listNotnested.findIndex(todo => todo.id === event.id)
        if (index < 1) {
            return
        }
        const todoId = listNotnested[index - 1].id
        this.props.nestTodo(todoId, event.id)
    }

    private nestOut(event: any) {
        this.props.nestTodo('', event)
    }

    private moveDownTodo(event: any) {
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

    private moveUpTodo(event: any) {
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

    private inUpdateTodo(event: any) {
        this.toggleUpdate()
        this.setState({currentTodoAdjust: event})
    }

    private deleteTodo(event: any) {
        this.props.deleteTodo(event)
    }

    private nameTodo(event: any) {
        this.setState({newTodoName: event.target.value})
    }

    private updateTodo(event: any) {
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

    private cancelUpdateTodo(event: any) {
        event.stopPropagation()
        event.preventDefault()
        this.setState({currentTodoAdjust: ''})
        this.toggleUpdate()
    }
}

export default compose<IProps, Iouterprops>
(withTodos(), withLists())
(ContentTodo);