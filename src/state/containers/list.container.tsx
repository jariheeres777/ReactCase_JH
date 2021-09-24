import * as React from 'react';
import { connect } from 'react-redux';
import { IList } from '../../model/interfaces/IList';
import { addlist, deleteList, loadLists,updateList ,moveUpList, moveDownList } from '../actions/list.actions';
import { RootState } from '../reducers/root.reducers';

export interface IListState {
  lists: IList[];
}

export interface IListActions {
  loadLists(): void;
  deleteList(listId: string): void;
  addlist(list: IList): void,
  updateList(list: IList ):void
  moveUpList(list: IList ):void
  moveDownList(list: IList ):void
}

const mapStateToProps = (state: RootState) => ({
  lists: state.lists.lists
});

const mapDispatchToProps: IListActions = {
  loadLists,
  deleteList,
  addlist,
  updateList,
  moveUpList,
  moveDownList
};

interface IListProps extends IListState, IListActions { }

export const withLists = () => (Component: React.ComponentType) => {
  class ListContainer extends React.PureComponent<IListProps> {
    constructor(props: IListProps) {
      super(props);
      if (props.lists.length === 0) {
        props.loadLists();
      }
    }

    public render() {
      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(ListContainer);
};

