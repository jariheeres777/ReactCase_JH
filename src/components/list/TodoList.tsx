import * as React from 'react';
import {compose} from 'recompose';
import {IListActions, IListState, withLists} from '../../state/containers/list.container';
import {Divider, ListItem, ListItemText, List, Button, TextField, InputLabel,} from '@material-ui/core';
import StyledTodoList from './styled/StyledTodoList';
import {IList} from '../../model/interfaces/IList';
import {v4 as uuid} from 'uuid';
import {useState} from "react";
import AddTodoList from './AddTodolist'
import ShowTodoList from './ShowTodoList';

class TodoList extends React.Component {

    render() {
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
                <ShowTodoList/>
                <AddTodoList/>
            </StyledTodoList>
        );
    }
}

export default TodoList;
