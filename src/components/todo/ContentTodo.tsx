import {
    Button,
    Checkbox,
    Input,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
} from "@material-ui/core";
import React from "react";
import { compose } from "recompose";
import { ITodoState, ITodoActions, withTodos } from "../../state/containers/Todo.container";
import { ITodo } from "../../model/interfaces/ITodo";
import { IListActions, IListState, withLists } from "../../state/containers/list.container";
import todos from "../../data/todos";
import lists from "../../data/lists";
import { ITagActions, ITagState, withTags } from "../../state/containers/Tag.container";
import TagsTodo from "../tag/TagsTodo";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowbackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ShowComments from '../comments/ShowComments'
import ChatIcon from '@material-ui/icons/Chat';
import { ICommentActions, ICommentState, withComments } from "../../state/containers/Comments.container";
import { IComments } from "../../model/interfaces/IComments";
import { v4 as uuid } from "uuid";

interface Iouterprops {
    todo: ITodo;
}

interface IProps extends ITodoState
    , ITodoActions
    , IListState
    , IListActions
    , Iouterprops
    , ITagState
    , ITagActions
    , ICommentActions
    , ICommentState {
}

interface IState {
    inUpdate: boolean;
    currentTodoAdjust: string;
    newTodoName: string;
    updateTag: boolean;
    addComent: boolean;
    commentText: string;
    parentComment: string;
}

class ContentTodo extends React.Component<IProps, IState> {
    public state = {
        inUpdate: false,
        currentTodoAdjust: '',
        newTodoName: '',
        updateTag: false,
        addComent: false,
        commentText: '',
        parentComment: ''
    };

    render() {
        const { todo } = this.props;
        const { tags } = this.props;
        const { comments } = this.props;
        const activeListId = lists.filter(list => list.active ? list.id : null);
        const hasNestedId = todos.filter(todo => todo.parentTodoId !== undefined ? todo.parentTodoId : null).map(todo => todo.parentTodoId);
        return (
            <>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <ListItem button key={todo.id}
                            onClick={(event) => {
                                event.stopPropagation()
                            }}
                        >
                            {todo.parentTodoId !== undefined &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" className="bi bi-arrow-return-right"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z" />
                                </svg>
                            }
                            <Checkbox checked={todo.complete}
                                onClick={this.handleCompleteTodo.bind(this, todo.id)} />
                            {this.state.currentTodoAdjust !== todo.id &&
                                <>
                                    <div className='todoText'>
                                        <ListItemText primary={todo.title} />
                                    </div>
                                    {(todo.user !== undefined && todo.user !== '') &&
                                        <div className='todoText paddingLeft'>
                                            <ListItemText primary={`made by:${todo.user}`} />
                                        </div>
                                    }
                                    {todo.dueDate !== undefined && todo.completedOn === undefined &&
                                        <div className='todoDate'>
                                            <ListItemText primary={todo.dueDate} />
                                        </div>
                                    }
                                    {todo.completedOn !== undefined &&
                                        <div className='todoDate'>
                                            <ListItemText primary={todo.completedOn} />
                                        </div>
                                    }
                                    {activeListId[0].id !== 'default_list_upcoming' && activeListId[0].id !== `default_my_todo's` &&
                                        <>
                                            {todo.parentTodoId === undefined &&
                                                <IconButton
                                                    disabled={todo.order === 1 || hasNestedId.includes(todo.id)}
                                                    onClick={(event) => {
                                                        this.nestInto(todo)
                                                    }}>
                                                    <ArrowForwardIcon />|
                                                </IconButton>
                                            }
                                            {todo.parentTodoId !== undefined &&
                                                <IconButton
                                                    onClick={(event) => {
                                                        this.nestOut(todo.id)
                                                    }}>
                                                    |<ArrowbackIcon />
                                                </IconButton>
                                            }
                                            <IconButton
                                                onClick={(event) => {
                                                    this.moveDownTodo(todo)
                                                }}>
                                                <ArrowUpwardIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={(event) => {
                                                    this.moveUpTodo(todo)
                                                }}>
                                                <ArrowDownwardIcon />
                                            </IconButton>
                                        </>}
                                    <IconButton
                                        onClick={(event) => {
                                            this.inUpdateTodo(todo.id)
                                        }}>
                                        <CreateIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={(event) => {
                                            this.deleteTodo(todo.id)
                                        }}>
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                    {tags
                                        .filter(tag => todo.tags?.includes(tag.id))
                                        .map((tag) => (
                                            <>
                                                <TagsTodo tag={tag} todo={todo} />
                                            </>
                                        )
                                        )}
                                    {!this.state.updateTag &&
                                        <IconButton
                                            onClick={() => {
                                                this.toggleTag()
                                            }}>
                                            <AddIcon />
                                        </IconButton>
                                    }
                                    {this.state.updateTag &&
                                        <>
                                            <select onChange={this.addTagTodo.bind(this, todo.id)}>
                                                <option selected={true} disabled={true}>
                                                    select your tag
                                                </option>
                                                {tags
                                                    .filter(tag => !todo.tags?.includes(tag.id))
                                                    .map((tag) => (
                                                        <option>
                                                            {tag.name}
                                                        </option>
                                                    ))}
                                            </select>
                                            <IconButton onClick={() => {
                                                this.toggleTag()
                                            }}>
                                                <CloseIcon />
                                            </IconButton>
                                        </>
                                    }
                                </>
                            }
                            {this.state.currentTodoAdjust === todo.id &&
                                <>
                                    <div className='todoText'>
                                        <Input value={this.state.newTodoName}
                                            onChange={(event) => {
                                                this.nameTodo(event)
                                            }} />
                                    </div>
                                    <Button variant="contained"
                                        onClick={this.updateTodo.bind(this, todo)
                                        }>confirm
                                    </Button>
                                    <Button variant="contained"
                                        onClick={(event) => {
                                            this.cancelUpdateTodo()
                                        }}>
                                        cancel
                                    </Button>
                                </>
                            }
                        </ListItem>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {todo.description}
                            <>
                                {comments
                                    .filter((comment) => comment.parentCommentId === undefined)
                                    .filter((comment) => comment.todoId === todo.id)
                                    .map((comment) => (
                                        <div className='todoDate'>
                                            <ShowComments comment={comment} />
                                            {!this.state.addComent &&
                                                <IconButton
                                                    onClick={() => {
                                                        this.toggleAdd(comment.id)
                                                    }}>
                                                    <ChatIcon />
                                                </IconButton>
                                            }
                                            {comments
                                                .filter((commentR) => commentR.parentCommentId === comment.id)
                                                .filter((comment) => comment.parentCommentId !== undefined)
                                                .filter((comment) => comment.todoId === todo.id)
                                                .map((comment) => (
                                                    <div className='paddingLeft90px'>
                                                        <ShowComments comment={comment} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </>
                            <br />
                            {!this.state.addComent &&
                                <IconButton
                                    onClick={() => {
                                        this.toggleAdd('')
                                    }}>
                                    <AddIcon />
                                </IconButton>
                            }
                            {this.state.addComent &&
                                <>
                                    <div className='todoText'>
                                        <Input value={this.state.commentText}
                                            onChange={(event) => {
                                                this.nameComment(event)
                                            }} />
                                    </div>
                                    <Button variant="contained"
                                        onClick={this.updateComment.bind(this, todo.id)}>
                                        confirm
                                    </Button>
                                    <Button variant="contained"
                                        onClick={(event) => {
                                            this.toggleAdd('')
                                        }}>
                                        cancel
                                    </Button>
                                </>
                            }
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
        );
    };

    public toggleUpdate() {
        this.setState({
            inUpdate: !this.state.inUpdate,
            newTodoName: ''
        });
    };

    public handleCompleteTodo(listid: string) {
        this.props.completedTodo(listid);
    };

    public nestInto(event: any) {
        const { todos } = this.props;
        const activeList = lists.filter(list => list.active ? list.id : null);
        const activeTodos = todos.filter(todo => todo.listId === activeList[0].id);
        const listNotnested = activeTodos.filter(todo => todo.parentTodoId !== undefined ? null : todo.id);
        const index = listNotnested.findIndex(todo => todo.id === event.id);
        if (index < 1) {
            return
        }
        const todoId = listNotnested[index - 1].id;
        this.props.nestTodo(todoId, event.id);
    };

    public nestOut(event: any) {
        this.props.nestTodo('', event);
    };

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
            order: event.order,
            tags: event.tags,
            user: event.user
        }
        const number = -1;
        this.props.moveTodo(newTodo, number);
    };

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
            order: event.order,
            tags: event.tags,
            user: event.user
        }
        const number = 1;
        this.props.moveTodo(newTodo, number);
    };

    public inUpdateTodo(event: any) {
        this.toggleUpdate();
        this.setState({ currentTodoAdjust: event });
    };

    public deleteTodo(event: any) {
        this.props.deleteTodo(event);
    };

    public toggleTag() {
        this.setState({ updateTag: !this.state.updateTag });
    };

    public addTagTodo(todo: string, event: any) {
        const { tags } = this.props;
        const tag = tags.filter(tag => tag.name === event.target.value ? tag.id : null);
        this.props.addTagTodo(todo, tag[0].id);
        this.toggleTag();
    };

    public nameTodo(event: any) {
        this.setState({ newTodoName: event.target.value });
    };

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
            order: event.order,
            tags: event.tags,
            user: event.user
        };
        this.props.updateTodo(newTodo);
        this.setState({ currentTodoAdjust: '' });
        this.toggleUpdate();
    };

    public cancelUpdateTodo() {
        this.setState({ currentTodoAdjust: '' });
        this.toggleUpdate();
    };

    public toggleAdd(comment: string) {
        this.setState({
            addComent: !this.state.addComent,
            commentText: ''
        })
        if (comment !== '') {
            this.setState({ parentComment: comment });
        } else {
            this.setState({ parentComment: '' });
        }

    };

    public updateComment(todo: string) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        const date = dd + '/' + mm + '/' + yyyy;;
        let parent: undefined | string = this.state.parentComment;
        if (parent === '') {
            parent = undefined;
        }
        const loggedInUser = localStorage.getItem('user')
        const newComment: IComments = {
            id: uuid(),
            todoId: todo,
            parentCommentId: parent,
            comment: this.state.commentText,
            date: date,
            //@ts-ignore
            user: loggedInUser
        }
        this.props.createComment(newComment);
        this.toggleAdd('');
    };

    public nameComment(event: any) {
        this.setState({ commentText: event.target.value });
    };
}

export default compose<IProps, Iouterprops>
    (withTodos(), withLists(), withTags(), withComments())
    (ContentTodo);