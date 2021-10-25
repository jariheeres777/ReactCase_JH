import {
    Divider,
    ListItem,
    ListItemText,
    List,
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import React from 'react';
import {compose} from 'recompose';
import {IList} from '../../model/interfaces/IList';
import {IListState, IListActions, withLists} from '../../state/containers/list.container';
import {ITodoActions, ITodoState, withTodos} from "../../state/containers/Todo.container";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PublicIcon from '@material-ui/icons/Public';

interface IProps extends IListState, IListActions, ITodoActions, ITodoState {

}

interface IState {
    adjustListName: string;
    adjustVisible: boolean;
    currentModifiedList: {
        color: string;
        default: boolean;
        id: string;
        name: string;
        order: number;
        active: boolean;
        private: boolean;
        user: string;
    };
}

class ShowTodoList extends React.Component<IProps, IState> {
    public state = {
        adjustListName: '',
        adjustVisible: false,
        currentModifiedList: {
            color: ' ',
            default: false,
            id: ' ',
            name: ' ',
            order: 0,
            active: false,
            private: true,
            user: ''
        }
    };

    render() {
        const {lists} = this.props;
        const listNotPrivate = lists.filter((list) => !list.private);
        const user = localStorage.getItem('user');
        const listPrivate = lists.filter((list) => list.user === user);
        let arrayOfNotPrivateLists: string[] = [];
        for (let i = 0; i < listNotPrivate.length; i++) {
            arrayOfNotPrivateLists.push(listNotPrivate[i].id);
        }
        let arrayOfPrivateLists: string[] = [];
        for (let i = 0; i < listPrivate.length; i++) {
            arrayOfPrivateLists.push(listPrivate[i].id);
        }
        const filterLists = [...arrayOfNotPrivateLists, ...arrayOfPrivateLists];
        return (
            <>
                <ListItem className="list-item " button disabled>
                    <ListItemText primary="Lists"/>
                </ListItem>
                <Divider/>
                <List>
                    {lists
                        .filter((list) => filterLists.includes(list.id))
                        .sort((a, b) => a.order > b.order ? 1 : -1)
                        .map((list) => (
                            <>
                                {list.default &&
                                <ListItem button key={list.id}
                                          style={list.active ? {borderLeft: `5px solid ${list.color}`} : undefined}
                                          className={list.active ? "active" : ''}
                                          onClick={this.handleSetActiveList.bind(this, list)}>
                                    <ListItemText primary={list.name}/>
                                </ListItem>
                                }
                                {!list.default &&
                                <Accordion>
                                    <ListItem button key={list.id}
                                              style={list.active ? {borderLeft: `5px solid ${list.color}`} : undefined}
                                              className={list.active ? "active" : ''}
                                              onClick={this.handleSetActiveList.bind(this, list)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            {!this.state.adjustVisible &&
                                            <ListItemText primary={list.name}/>
                                            }
                                            {this.state.adjustVisible &&
                                            <TextField id="name" variant="outlined"
                                                       margin='dense'
                                                       value={this.state.adjustListName}
                                                       onChange={(event) => {
                                                           event.stopPropagation()
                                                           this.handleTextList(event.target.value)
                                                       }}/>
                                            }
                                        </AccordionSummary>
                                    </ListItem>
                                    <AccordionDetails>
                                        <Typography>
                                            {!this.state.adjustVisible &&
                                            <>
                                                <Button disabled={list.order === 2}
                                                        onClick={this.handleMoveUpList.bind(this, list)}>
                                                    🡹
                                                </Button>
                                                <Button disabled={list.order === (lists.length - 1)}
                                                        onClick={this.handleMoveDownList.bind(this, list)}>
                                                    🡻
                                                </Button>
                                                <Button onClick={this.handleOpenAdjustList.bind(this, list)}>
                                                    ✐
                                                </Button>
                                                <Button onClick={this.handleDeleteList.bind(this, list.id)}>
                                                    ❌
                                                </Button>
                                                <Button disabled={!list.private}
                                                        onClick={this.handleMakePublic.bind(this, list.id)}>
                                                    <PublicIcon/>
                                                </Button>

                                            </>
                                            }
                                            {this.state.adjustVisible &&
                                            <>
                                                <Button variant="outlined"
                                                        disabled={this.state.adjustListName === ''}
                                                        onClick={(event) => {
                                                            this.handleUpdateList()
                                                        }}>
                                                    confirm
                                                </Button>
                                                <Button variant="outlined"
                                                        onClick={(event) => {
                                                            this.handleAdjust()
                                                        }}>
                                                    cancel
                                                </Button>
                                            </>
                                            }
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                }
                            </>
                        ))
                    }
                </List>
            </>
        );
    };

    private handleAdjust() {
        this.setState({adjustVisible: !this.state.adjustVisible});
    };

    private handleSetActiveList = (list: any, event: any) => {
        this.props.setActiveList(list.id);
    };

    private handleMoveUpList(list: IList) {
        const moveUp: IList = {
            color: list.color,
            default: list.default,
            id: list.id,
            name: list.name,
            order: list.order,
            active: list.active,
            private: list.private,
            user: list.user
        };
        const moveSpots: number = -1
        this.props.moveList(moveUp, moveSpots);
    };

    private handleMoveDownList(list: IList) {
        const moveDown: IList = {
            color: list.color,
            default: false,
            id: list.id,
            name: list.name,
            order: list.order,
            active: list.active,
            private: list.private,
            user: list.user
        };
        const moveSpots: number = 1
        this.props.moveList(moveDown, moveSpots);
    };

    private handleOpenAdjustList(list: IList) {
        const listId = {
            color: list.color,
            default: false,
            id: list.id,
            name: list.name,
            order: list.order,
            active: list.active,
            private: list.private,
            user: list.user
        };
        this.handleAdjust();
        this.setState({
            currentModifiedList: listId,
            adjustListName: ''
        });
    };

    private handleDeleteList(listid: string, event: any) {
        event.stopPropagation();
        const {lists} = this.props;
        const filterd = lists.filter(list => list.active);
        if (listid === filterd[0].id) {
            this.props.setActiveList('default_list');
        }
        this.props.deleteAllTodoList(listid);
        this.props.deleteList(listid);
    };

    private handleTextList(event: any) {
        this.setState({adjustListName: event});
    };

    private handleUpdateList() {
        const updateList: IList = {
            color: this.state.currentModifiedList.color,
            default: false,
            id: this.state.currentModifiedList.id,
            name: this.state.adjustListName,
            order: this.state.currentModifiedList.order,
            active: this.state.currentModifiedList.active,
            private: this.state.currentModifiedList.private,
            user: this.state.currentModifiedList.user
        };
        this.props.updateList(updateList);
        this.handleAdjust();
    };

    private handleMakePublic(listid: string) {
        this.props.setPublicList(listid);
    };
}

export default compose<IProps, {}>
(withLists(), withTodos())
(ShowTodoList);


