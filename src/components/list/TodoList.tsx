import * as React from 'react';
import StyledTodoList from './styled/StyledTodoList';
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
