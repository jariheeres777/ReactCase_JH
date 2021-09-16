import * as React from 'react';
import { compose } from 'recompose';
import { IListState, withLists } from '../../state/containers/list.container';
import { Divider, ListItem, ListItemText, List } from '@material-ui/core';
import StyledTodoList from './styled/StyledTodoList';


const TodoList = (props: IListState) => {
  const { lists } = props;

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
        <ListItem className="list-item" button disabled>
          <ListItemText primary="Lists" />
        </ListItem>
        <Divider />
        <List>
          {lists.map((list) => (
            <ListItem button key={list.id}>
              <ListItemText primary={list.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </StyledTodoList>
  );
};

export default compose<IListState, {}>(
  withLists()
)(TodoList);
