import {Divider, ListItem, ListItemText, List, Button, TextField, InputLabel} from '@material-ui/core';
import React, {useState} from 'react';
import {compose} from 'recompose';
import {IList} from '../../model/interfaces/IList';
import {IListState, IListActions, withLists} from '../../state/containers/list.container';

interface IProps extends IListState, IListActions {

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
    }
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
    }

    render() {
        const {lists} = this.props
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
                                      className={list.active ? "active" : ''}
                                      onClick={(event) => {
                                          this.setActiveList(list.id)
                                          event.preventDefault()
                                      }}>
                                <ListItemText primary={list.name}/>
                                {!list.default &&
                                <>
                                    <button disabled={list.order === 1}
                                            onClick={(event) => {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                this.moveUpList(list)

                                            }}>
                                        🡹
                                    </button>
                                    <button disabled={list.order === (lists.length - 1)}
                                            onClick={(event) => {
                                                event.preventDefault()
                                                event.stopPropagation()
                                                this.moveDownList(list)
                                            }}>
                                        🡻
                                    </button>
                                    <button onClick={(event) => {
                                        this.openAdjustList(list)
                                    }}>✐
                                    </button>
                                    <button onClick={(event) => {
                                        this.deleteList(list.id)
                                    }}>❌
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
                                       this.textList(event.target.value)}
                                       }
                            />
                        </InputLabel><br/><br/>
                        <Button variant="outlined"
                                disabled={this.state.adjustListName === ''}
                                onClick={() => {
                                    this.updateList()
                                }}>
                            confirm
                        </Button>
                        <Button variant="outlined"
                                onClick={() => {
                                    this.handleAdjust()
                                }}
                        >
                            cancel
                        </Button>
                    </>
                    }
                </List>
            </>
        )
    }

    private handleAdjust() {
        this.setState({adjustVisible: !this.state.adjustVisible})
    }

    private setActiveList(event: any) {
        if (event !== undefined) {
            this.props.setActiveList(event)
        }
    }

    private moveUpList(event: any) {
        const moveUp: IList = {
            color: event.color,
            default: event.default,
            id: event.id,
            name: event.name,
            order: event.order,
            active: false,
        };
        const moveSpots: number = -1
        this.props.moveList(moveUp, moveSpots)
    }

    private moveDownList(event: any) {
        const moveDown: IList = {
            color: event.color,
            default: false,
            id: event.id,
            name: event.name,
            order: event.order,
            active: event.active,
        };
        const moveSpots: number = 1
        this.props.moveList(moveDown, moveSpots)
    }

    private openAdjustList(event: any) {
        const listId = {
            color: event.color,
            default: false,
            id: event.id,
            name: event.name,
            order: event.order,
            active: event.active
        }
        this.handleAdjust()
        this.setState({
            currentModifiedList: listId,
            adjustListName:''
        })

    }

    private deleteList(event:any) {
        this.props.deleteList(event)
    }
    private textList(event:any){
        this.setState({adjustListName: event})
    }

    private updateList() {
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
    }

}

export default compose<IProps, {}>
(withLists())
(ShowTodoList);


