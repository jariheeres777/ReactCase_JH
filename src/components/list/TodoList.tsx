import * as React from 'react';
import StyledTodoList from './styled/StyledTodoList';
import AddTodoList from './AddTodolist'
import ShowTodoList from './ShowTodoList';

class TodoList extends React.Component {

    render() {
        return (
            <div data-testid='list-1'>
                <StyledTodoList
                    variant="permanent"
                    anchor="left"
                    PaperProps={{
                        classes: {
                            root: 'drawer-paper'
                        }
                    }}>
                    <ShowTodoList/>
                    <AddTodoList/>
                </StyledTodoList>
            </div>
        );
    };
}

export default TodoList;
