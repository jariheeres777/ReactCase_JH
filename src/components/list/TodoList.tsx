import * as React from 'react';
import {compose} from 'recompose';
import {IListActions, IListState, withLists} from '../../state/containers/list.container';
import {Divider, ListItem, ListItemText, List, Button, TextField, InputLabel} from '@material-ui/core';
import StyledTodoList from './styled/StyledTodoList';
import {IList} from '../../model/interfaces/IList';
import {v4 as uuid} from 'uuid';
import {useState} from "react";


interface IProps extends IListState, IListActions {


}

const TodoList = (props: IProps) => {

        const {lists} = props;
        const [listName, setListName] = useState('');
        const [listColor, setListColor] = useState('#000000');
        const [addVisible, setAddvisible] = useState('0')
        const [adjustVisible, setAdjustvisible] = useState('0')
        const [activeList, setActiveList] = useState([])
        const [adjustListName, setAdjustListName] = useState('')

        function handleAdjust() {
            if (adjustVisible === '1') {
                setAdjustvisible('0')
            } else {
                setAdjustvisible('1')
            }
        }

        function toggleAdd() {
            if (addVisible === '1') {
                setAddvisible('0')
            } else {
                setAddvisible('1')
            }
        }

        if (lists.length === 0) {
            return null;
        }

        return (
            <StyledTodoList
                variant="permanent"
                anchor="left"
                PaperProps={{
                    classes: {
                        root: 'drawer-paper'
                    }
                }}
            >
                <ListItem className="list-item " button disabled>
                    <ListItemText primary="Lists"/>
                </ListItem>
                <Divider/>
                <List>
                    {lists.sort((a, b) => a.order > b.order ? 1 : -1).map((list) => (
                        <ListItem button key={list.id}
                                  className={list.active === true ? "active" : ''}
                                  onClick={(e) => {
                                      props.setActiveList(list.id)
                                  }}>
                            <ListItemText primary={list.name}
                                          style={{color: list.color}}
                            />
                            {list.name !== 'Inbox' &&
                            <>
                                <button disabled={list.order === 1}
                                        onClick={(e) => {
                                            const moveUp: IList = {
                                                color: list.color,
                                                default: false,
                                                id: list.id,
                                                name: list.name,
                                                order: list.order,
                                                active: false
                                            };
                                            props.moveUpList(moveUp)
                                        }}>
                                    🡹
                                </button>
                                <button disabled={list.order === (lists.length - 1)}
                                        onClick={(e) => {
                                            const moveDown: IList = {
                                                color: list.color,
                                                default: false,
                                                id: list.id,
                                                name: list.name,
                                                order: list.order,
                                                active: false
                                            };
                                            props.moveDownList(moveDown)
                                        }}>
                                    🡻
                                </button>
                                <button onClick={(e) => {
                                    const listId: [string, boolean, string, string, number] = [
                                        list.color,
                                        false,
                                        list.id,
                                        list.name,
                                        list.order
                                    ]
                                    // @ts-ignore
                                    setActiveList(listId)
                                    handleAdjust()
                                }
                                }>✐
                                </button>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    props.deleteList(list.id)
                                    if (adjustVisible === '1') {
                                        handleAdjust()
                                    }
                                }
                                }>❌
                                </button>
                            </>
                            }
                        </ListItem>
                    ))
                    }
                </List>
                <Divider/>
                {addVisible === '0' &&
                <>
                    <Button onClick={toggleAdd}>
                        addlist
                    </Button>
                    <Divider/>
                </>
                }
                {addVisible === '0' ? null :
                    <>
                        < InputLabel margin='dense'>
                            Name
                            <TextField id="name" variant="outlined"
                                       margin='dense'
                                       value={listName}
                                       onChange={(event) => setListName(event.target.value)}
                            />
                        </InputLabel>
                        <InputLabel margin='dense'>
                            Color<br/><br/>
                            <input type='color' id="color"
                                   value={listColor}
                                   onChange={(event) => setListColor(event.target.value)}/>
                        </InputLabel><br/><br/>
                        <Divider/>
                        <Button disabled={listName === ''}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setListColor('')
                                    setListName('')
                                    const list: IList = {
                                        color: listColor,
                                        default: false,
                                        id: uuid(),
                                        name: listName,
                                        order: lists.length,
                                        active: false
                                    };
                                    props.addlist(list)
                                    toggleAdd()
                                }}>
                            confirm
                        </Button>
                        <Divider/>
                        <Button onClick={toggleAdd}>
                            cancel
                        </Button>
                    </>
                }
                <Divider/>
                {adjustVisible === '1' &&
                <>
                    <InputLabel margin='dense'>
                        Name
                        <TextField id="name" variant="outlined"
                                   margin='dense'
                                   value={adjustListName}
                                   onChange={(event) => setAdjustListName(event.target.value)}
                        />
                    </InputLabel><br/><br/>
                    <Button variant="outlined"
                            disabled={adjustListName === ''}
                            onClick={(e) => {
                                e.preventDefault()
                                const updateList: IList = {
                                    color: activeList[0],
                                    default: activeList[1],
                                    id: activeList[2],
                                    name: adjustListName,
                                    order: activeList[4],
                                    active: false
                                };
                                props.updateList(updateList)
                                handleAdjust()
                            }
                            }>
                        confirm
                    </Button>
                    <Button variant="outlined"
                            onClick={handleAdjust}>
                        cancel
                    </Button>
                </>
                }
            </StyledTodoList>
        );
    }
;

export default compose
< IProps
,
{
}
>
(withLists()
)(TodoList);
