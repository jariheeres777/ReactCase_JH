import React from 'react';
import AddTodoItem from './AddTodoItem';
import ShowTodoItem from './ShowTodoItem';
import AddTagItem from '../tag/AddTagItem';
import DeleteOrUpdateTag from "../tag/DeleteOrUpdateTag";

class TodoItems extends React.Component {
    render() {
        return (
            <>
                <ShowTodoItem/>
                <div className='container'>
                    <div className='box'>
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
                        <h2>
                            update/delete Tag
                        </h2>
                        <DeleteOrUpdateTag/>
                    </div>
                </div>


            </>
        );
    };
}

export default TodoItems

