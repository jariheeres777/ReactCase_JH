import React from 'react';
import AddTodoItem from './AddTodoItem';
import ShowTodoItem from './ShowTodoItem';
import AddTagItem from './AddTagItem';
import DeleteOrUpdateTag from "./DeleteOrUpdateTag";

class TodoItems extends React.Component {
    render() {
        return (
            <>
                <ShowTodoItem/>
                <div className='container'>
                    <div className='box'
                         style={{margin:'0'}}>
                    <h2>
                        Add Todo
                    </h2>
                        <AddTodoItem/>
                    </div>
                    <div className='box'>
                        <h2>
                            Add Tag
                        </h2>
                        <AddTagItem/>
                    </div>
                    <div className='box'>
                        <DeleteOrUpdateTag/>
                    </div>
                </div>


            </>
        )
    }
}

export default TodoItems

