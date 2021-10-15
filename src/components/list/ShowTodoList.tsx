import {Divider, ListItem, ListItemText, List, Button, TextField, InputLabel, IconButton} from '@material-ui/core';
import React from 'react';
import {compose} from 'recompose';
import {IList} from '../../model/interfaces/IList';
import {IListState, IListActions, withLists} from '../../state/containers/list.container';
import lists from "../../data/lists";
import {ITodoActions, ITodoState, withTodos} from "../../state/containers/Todo.container";

interface IProps extends IListState, IListActions, ITodoActions, ITodoState {

}

interface IState {
    adjustListName: string
    adjustVisible: boolean
    currentModifiedList: {
        color: string,
        default: boolean,
        id: string,
        name: string,
        order: number,
        active: boolean
    };
}

class ShowTodoList extends React.Component<IProps, IState> {
    public state = {
        adjustListName: '',
        adjustVisible: false,
        currentModifiedList: {
            color: ' ',
            default: false,
            id: ' ',
            name: ' ',
            order: 0,
            active: false
        }
    };

    render() {
        const {lists} = this.props
        const {todos} = this.props
        return (
            <>
                <ListItem className="list-item " button disabled>
                    <ListItemText primary="Lists"/>
                </ListItem>
                <Divider/>
                <List>
                    {lists
                        .sort((a, b) => a.order > b.order ? 1 : -1)
                        .map((list) => (
                            <ListItem button key={list.id}
                                      style={list.active ? {borderLeft: `5px solid ${list.color}`} : undefined}
                                      className={list.active ? "active" : ''}
                                      onClick={this.handleSetActiveList.bind(this, list)}>
                                <ListItemText primary={list.name}/>
                                {!list.default &&
                                <>
                                    <button disabled={list.order === 1}
                                            onClick={this.handleMoveUpList.bind(this, list)}>
                                        🡹
                                    </button>
                                    <button disabled={list.order === (lists.length - 1)}
                                            onClick={this.handleMoveDownList.bind(this, list)}>
                                        🡻
                                    </button>
                                    <button onClick={this.handleOpenAdjustList.bind(this, list)}>
                                        ✐
                                    </button>
                                    <button onClick={this.handleDeleteList.bind(this, list.id)}>
                                        ❌
                                    </button>
                                </>
                                }
                            </ListItem>
                        ))
                    }
                    {this.state.adjustVisible &&
                    <>
                        <InputLabel margin='dense'>
                            Name
                            <TextField id="name" variant="outlined"
                                       margin='dense'
                                       value={this.state.adjustListName}
                                       onChange={(event) => {
                                           this.handleTextList(event.target.value)
                                       }}/>
                        </InputLabel><br/><br/>
                        <Button variant="outlined"
                                disabled={this.state.adjustListName === ''}
                                onClick={(event) => {
                                    this.handleUpdateList()
                                }}>
                            confirm
                        </Button>
                        <Button variant="outlined"
                                onClick={(event) => {
                                    this.handleAdjust()
                                }}>
                            cancel
                        </Button>
                    </>
                    }
                </List>
            </>
        );
    };

    private handleAdjust() {
        this.setState({adjustVisible: !this.state.adjustVisible})
    };

    private handleSetActiveList = (list: any, event: any) => {
        this.props.setActiveList(list.id)
    };

    private handleMoveUpList(list: IList) {
        const moveUp: IList = {
            color: list.color,
            default: list.default,
            id: list.id,
            name: list.name,
            order: list.order,
            active: list.active,
        };
        const moveSpots: number = -1
        this.props.moveList(moveUp, moveSpots)
    };

    private handleMoveDownList(list: IList) {
        const moveDown: IList = {
            color: list.color,
            default: false,
            id: list.id,
            name: list.name,
            order: list.order,
            active: list.active,
        };
        const moveSpots: number = 1
        this.props.moveList(moveDown, moveSpots)
    };

    private handleOpenAdjustList(list: IList) {
        const listId = {
            color: list.color,
            default: false,
            id: list.id,
            name: list.name,
            order: list.order,
            active: list.active
        };
        this.handleAdjust()
        this.setState({
            currentModifiedList: listId,
            adjustListName: ''
        })
    };

    private handleDeleteList(listid: string, event: any) {
        event.stopPropagation()
        const {lists} = this.props
        const filterd = lists.filter(list => list.active)
        console.log(filterd[0].id)
        if (listid === filterd[0].id) {
            this.props.setActiveList('default_list')
        }
        this.props.deleteAllTodoList(listid)
        this.props.deleteList(listid)
    };
    private handleTextList(event: any) {
        this.setState({adjustListName: event})
    };

    private handleUpdateList() {
        const updateList: IList = {
            color: this.state.currentModifiedList.color,
            default: false,
            id: this.state.currentModifiedList.id,
            name: this.state.adjustListName,
            order: this.state.currentModifiedList.order,
            active: this.state.currentModifiedList.active
        };
        this.props.updateList(updateList)
        this.handleAdjust()
    };
}

export default compose<IProps, {}>
(withLists(), withTodos())
(ShowTodoList);


