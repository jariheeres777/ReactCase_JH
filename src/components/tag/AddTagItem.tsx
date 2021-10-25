import React from "react";
import {compose} from "recompose";
import {ITagActions, ITagState, withTags} from "../../state/containers/Tag.container";
import {Button, Input, InputLabel} from "@material-ui/core";
import {ITag} from "../../model/interfaces/ITag";
import {v4 as uuid} from 'uuid';

interface IProps extends ITagState, ITagActions {

}

interface IState {
    tagColor: string
    tagName: string
}

class AddTodoItem extends React.Component<IProps, IState> {
    public state = {
        tagName: '',
        tagColor: '#000000'
    };

    render() {
        return (
            <>
                <>
                    <Input
                        className='todoText'
                        margin='dense'
                        placeholder="title"
                        value={this.state.tagName}
                        onChange={(event) => {
                            this.handleSetTagName(event)
                        }}/>
                </>
                <br/>
                <>
                    <InputLabel margin='dense'>
                        Color<br/><br/>
                        <input type='color' id="color"
                               onChange={(event) => {
                                   this.handleSetTagColor(event)
                               }}
                        />
                    </InputLabel><br/><br/>
                </>
                <>
                    <Button variant="outlined"
                            disabled={this.state.tagName === ''}
                            onClick={(event) => {
                                this.handleAddTag(event)
                            }}>
                        confirm
                    </Button>
                    <Button variant="outlined">
                        cancel
                    </Button>
                </>
            </>
        );
    };

    public handleSetTagName(event: any) {
        this.setState({tagName: event.target.value});
    };

    public handleSetTagColor(event: any) {
        this.setState({tagColor: event.target.value});
    };

    private handleAddTag(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        const newTag: ITag = {
            id: uuid(),
            name: this.state.tagName,
            color: this.state.tagColor
        };
        this.props.createTag(newTag);
        this.setState({
            tagName: '',
            tagColor: '#000000'
        });
    };
}

export default compose<IProps, {}>
(withTags())
(AddTodoItem);