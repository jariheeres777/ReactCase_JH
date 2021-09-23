import * as React from 'react';
import {compose} from 'recompose';
import {IListActions, IListState, withLists} from '../../state/containers/list.container';
import {Divider, ListItem, ListItemText, List, Button} from '@material-ui/core';
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
                    {lists.map((list) => (
                        <ListItem button key={list.id}>
                            <ListItemText primary={list.name}
                            />
                            {list.name !== 'Inbox' &&
                            <>
                                <Button>
                                  
                                </Button>
                                <button>
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
                                }>adjust
                                </button>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    props.deleteList(list.id)
                                }
                                }>x
                                </button>
                            </>
                            }
                        </ListItem>
                    ))
                        .sort((a, b) => a.props.order > b.props.order ? -1 : 1)
                    }

                </List>
                <Divider/>
                <label>
                    name
                </label>
                <input id="name"
                       value={listName}
                       onChange={(event) => setListName(event.target.value)}
                />
                <label>
                    color
                </label>
                <input id="color"
                       value={listColor}
                       onChange={(event) => setListColor(event.target.value)}/>
                <Divider/>
                <br/>
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
