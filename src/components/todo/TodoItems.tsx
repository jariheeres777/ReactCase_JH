import React from 'react';
import AddTodoItem from './AddTodoItem';
import ShowTodoItem from './ShowTodoItem';
import AddTagItem from '../tag/AddTagItem';
import DeleteOrUpdateTag from "../tag/DeleteOrUpdateTag";
import {IListActions, IListState, withLists} from "../../state/containers/list.container";
import {ITagActions, ITagState} from "../../state/containers/Tag.container";
import {compose} from "recompose";

interface IProps extends IListState, IListActions, ITagState, ITagActions {

}

class TodoItems extends React.Component<IProps> {
    render() {
        const {lists} = this.props
        const activeListId = lists.filter(list => list.active ? list.id : null)
        return (
            <>
                <ShowTodoItem/>
                {activeListId[0].id !== 'default_list_upcoming' &&
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
                }
            </>
        );
    };
}

export default compose<IProps, {}>
(withLists())
(TodoItems);

