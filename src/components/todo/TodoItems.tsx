import React from 'react';
import AddTodoItem from './AddTodoItem'
import ShowTodoItem from './ShowTodoItem';


class TodoItems extends React.Component {
    render() {
        return (
            <>
                <ShowTodoItem/>
                <AddTodoItem/>
            </>
        )
    }


}

export default TodoItems

