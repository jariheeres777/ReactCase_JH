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
        const [listColor, setListColor] = useState('');


        if (lists.length === 0) {
            return null;
        }

        // @ts-ignore
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
                <ListItem className="list-item" button disabled>
                    <ListItemText primary="Lists"/>
                </ListItem>
                <Divider/>
                <List>
                    {lists.sort((a, b) => a.order > b.order ? 1 : -1).map((list) => (
                        <ListItem button key={list.id}>
                            <ListItemText primary={list.name}
                                          color={list.color}
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
                                                order: list.order
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
                                                order: list.order
                                            };

                                            props.moveDownList(moveDown)
                                        }}>
                                    🡻
                                </button>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    const updateList: IList = {
                                        color: listColor,
                                        default: false,
                                        id: list.id,
                                        name: listName,
                                        order: list.order
                                    };

                                    props.updateList(updateList)
                                }
                                }>✐
                                </button>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    props.deleteList(list.id)
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
                <InputLabel margin='dense'>
                    Name
                    <TextField id="name" variant="outlined" margin='dense'
                               value={listName}
                               onChange={(event) => setListName(event.target.value)}
                    />
                </InputLabel>
                <InputLabel margin='dense'>
                    Color
                    <TextField id="color" variant="outlined" margin='dense'
                               value={listColor}
                               onChange={(event) => setListColor(event.target.value)}/>
                </InputLabel><br/><br/>
                <Divider/>

                <Button disabled={listColor === '' || listName === ''}
                        onClick={(e) => {
                            e.preventDefault()
                            setListColor('')
                            setListName('')
                            const list: IList = {
                                color: listColor,
                                default: false,
                                id: uuid(),
                                name: listName,
                                order: lists.length
                            };
                            props.addlist(list)
                        }}>
                    addlist
                </Button>
                <Divider/>
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
