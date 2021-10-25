import React from "react";
import {compose} from "recompose";
import {ITagActions, ITagState, withTags} from "../../state/containers/Tag.container";
import {Button, IconButton, Input, InputLabel} from "@material-ui/core";
import {ITag} from "../../model/interfaces/ITag";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {ITodoActions, ITodoState, withTodos} from "../../state/containers/Todo.container";

interface IProps extends ITagState, ITagActions, ITodoActions, ITodoState {

}

interface IState {
    tagId: string
    tagName: string
    tagColor: string
    inDelete: boolean
    inupdate: boolean
    showSelected: boolean
}

class DeleteOrUpdateTag extends React.Component<IProps, IState> {
    public state = {
        tagId: '',
        tagName: '',
        tagColor: '',
        inDelete: false,
        inupdate: false,
        showSelected: false
    };

    render() {
        const {tags} = this.props;
        if (tags.length === 0) {
            return null;
        }
        return (
            <>
                <>

                    <Button onClick={() => {
                        this.toggleAdjust()
                    }}>
                        adjustTag
                    </Button>
                    <Button onClick={() => {
                        this.toggleDelete()
                    }}>
                        deleteTag
                    </Button><br/><br/>
                    {this.state.showSelected &&
                    <select onChange={this.handleSelectedTag.bind(this, tags)}>
                        <option selected={true} disabled={true}>
                            select your tag
                        </option>
                        {tags
                            .map((tag) => (
                                <option>
                                    {tag.name}
                                </option>
                            ))
                        }
                    </select>
                    }
                    <br/>
                    <br/>
                    {this.state.inDelete &&
                    <IconButton
                        disabled={this.state.tagId === ''}
                        onClick={(event) => {
                            this.deletetag()
                        }}>
                        <DeleteOutlinedIcon/>
                    </IconButton>
                    }
                    {this.state.inupdate &&
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
                        <br/>
                        <>
                            <InputLabel margin='dense'>
                                Color<br/><br/>
                                <input type='color' id="color"
                                       onChange={(event) => {
                                           this.handleSetTagColor(event)
                                       }}/>
                            </InputLabel><br/><br/>
                        </>
                        <>
                            <Button variant="outlined"
                                    disabled={this.state.tagName === '' || this.state.tagId === ''}
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
                    }
                </>
            </>
        );
    };

    public toggleAdjust() {
        this.setState(
            {inupdate: !this.state.inupdate, inDelete: false, showSelected: true});
    };

    public toggleDelete() {
        this.setState({inupdate: false, inDelete: !this.state.inDelete, showSelected: true});
    };

    public handleSelectedTag(tags: ITag[], event: any) {
        const seletedTagId = tags.filter(tag => tag.name === event.target.value);
        this.setState({tagId: seletedTagId[0].id});
    };

    public deletetag() {
        this.props.deleteTagAllTodo(this.state.tagId);
        this.props.deleteTag(this.state.tagId);
        this.setState(
            {inupdate: false, inDelete: false, showSelected: false});
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
            id: this.state.tagId,
            name: this.state.tagName,
            color: this.state.tagColor
        };
        this.props.updateTag(newTag);
        this.setState({
            tagName: '',
            tagColor: '#000000',
            inupdate: !this.state.inupdate,
            inDelete: false,
            showSelected: false
        });

    };
}

export default compose<IProps, {}>
(withTags(), withTodos())
(DeleteOrUpdateTag);