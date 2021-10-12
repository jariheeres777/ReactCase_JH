import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../reducers/root.reducers';
import {ITag} from "../../model/interfaces/ITag";
import {loadTags} from "../actions/Tag.action";

export interface ITagState {
    tags: ITag[]
}

export interface ITagActions {
    loadTags(): void
}

function mapStateToProps(state: RootState) {
    return{tags: state.tags.tags}
}

const mapDispatchToProps: ITagActions = {
    loadTags
};

interface ITagsProps extends ITagState, ITagActions {
}

export const withTags = () => (Component: React.ComponentType) => {
    class TagContainer extends React.PureComponent<ITagsProps> {
        constructor(props: ITagsProps) {
            super(props);
                if (props.tags.length === 0) {
                props.loadTags()
            }
        }
        public render() {
            return <Component {...this.props} />;
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(TagContainer);
};