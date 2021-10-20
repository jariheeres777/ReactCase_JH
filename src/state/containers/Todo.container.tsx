import * as React from 'react';
import {connect} from 'react-redux';
import {ITodo} from '../../model/interfaces/ITodo';
import {
    loadTodos,
    createTodo,
    deleteTodo,
    moveTodo,
    updateTodo,
    nestTodo,
    completedTodo,
    deleteTagTodo,
    addTagTodo,
    deleteTagAllTodo,
    deleteAllTodoList
} from '../actions/Todo.action'
import {RootState} from '../reducers/root.reducers';

export interface ITodoState {
    todos: ITodo[];
}

export interface ITodoActions {
    loadTodos(): void;

    createTodo(todos: ITodo): void;

    deleteTodo(todoId: string): void;

    moveTodo(todoId: ITodo, number: number): void;

    updateTodo(todos: ITodo): void;

    nestTodo(todoIdParent: string, todoIdChild: string): void;

    completedTodo(todoId: string): void;

    deleteTagTodo(todoId: string, tagId: string): void;

    addTagTodo(todoId: string, tagId: string): void;

    deleteTagAllTodo(tagId: string):void;

    deleteAllTodoList(listid: string):void;
}

function mapStateToProps(state: RootState) {
    return {todos: state.todos.todos}
}

const mapDispatchToProps: ITodoActions = {
    loadTodos,
    createTodo,
    deleteTodo,
    moveTodo,
    updateTodo,
    nestTodo,
    completedTodo,
    deleteTagTodo,
    addTagTodo,
    deleteTagAllTodo,
    deleteAllTodoList
};

interface ITodoProps extends ITodoState, ITodoActions {
    
}

export const withTodos = () => (Component: React.ComponentType) => {
    class TodoContainer extends React.PureComponent<ITodoProps> {
        constructor(props: ITodoProps) {
            super(props);
            if (props.todos.length === 0) {
                props.loadTodos()
            }
        };

        public render() {
            return <Component {...this.props} />;
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
};