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



const openAddList: boolean = true

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
                        <ListItemText primary={list.name}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <Divider/>
            <Button >
                addlist
            </Button>

            <Divider/>
            {openAddList &&
            <>
                <label>
                    name
                </label>
                <input id="name"
                       value={listName}
                       onChange={(event)=> setListName(event.target.value)}
                />
                <label>
                    color
                </label>
                <input id="color"
                       value={listColor}
                       onChange={(event)=> setListColor(event.target.value)}/>
                <Button onClick={(e) => {
                    e.preventDefault()
                    const list: IList = {
                        color: listColor,
                        default: false,
                        id: uuid(),
                        name: listName,
                        order: 1
                    };
                    props.Addlist(list)
                }}>
                    addlist
                </Button>
            </>
            }


        </StyledTodoList>
    );
};

export default compose<IProps, {}>(
    withLists()
)(TodoList);
