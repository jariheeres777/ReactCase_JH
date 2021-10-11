import * as React from 'react';
import {Divider, Button, TextField, InputLabel} from '@material-ui/core';
import {v4 as uuid} from 'uuid';
import {IList} from '../../model/interfaces/IList';
import {IListState, IListActions, withLists} from '../../state/containers/list.container';
import {compose} from 'recompose';

interface IProps extends IListState, IListActions {

}

interface IState {
    addVisible: boolean
    listName: string
    listColor: string
}

class AddTodolist extends React.Component<IProps, IState> {
    public state = {
        addVisible: false,
        listName: '',
        listColor: '#000000'
    }

    render() {
        return (
            <>
                {!this.state.addVisible &&
                <>
                    <Divider/>
                    <Button onClick={() => {
                        this.toggleAdd()
                    }}>
                        addlist
                    </Button>
                    <Divider/>
                </>
                }
                {this.state.addVisible &&
                <>
                    <Divider/>
                    < InputLabel margin='dense'>
                        Name
                        <TextField id="name" variant="outlined"
                                   margin='dense'
                                   value={this.state.listName}
                                   onChange={(event) => {
                                       this.handListText(event)
                                   }}
                        />
                    </InputLabel>
                    <InputLabel margin='dense'>
                        Color<br/><br/>
                        <input type='color' id="color"
                               value={this.state.listColor}
                               onChange={(event) => {
                                   this.handLeListColor(event)
                               }
                               }/>
                    </InputLabel><br/><br/>
                    <Divider/>
                    <Button disabled={this.state.listName === ''}
                            onClick={(event) => {
                                this.handLeAddList(event)
                            }
                            }>
                        confirm
                    </Button>
                    <Divider/>
                    <Button onClick={() => {
                        this.toggleAdd()
                    }}>
                        cancel
                    </Button>
                </>
                }
            </>
        )
    }

    private toggleAdd() {
        this.setState({
                listColor: '#000000',
                listName: ''
            }
        )
        this.setState({addVisible: !this.state.addVisible})
    }

    private handLeAddList(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        const {lists} = this.props;
        const listarrayorder = Math.max.apply(Math, lists.map(function (list) {
            return list.order;
        }))
        const order = listarrayorder + 1
        const list: IList = {
            color: this.state.listColor,
            default: false,
            id: uuid(),
            name: this.state.listName,
            order: order,
            active: false
        };
        this.props.addlist(list)
        this.toggleAdd()
    }

    private handListText(event: any) {
        this.setState({listName: event.target.value})
    }

    private handLeListColor(event: any) {
        this.setState({listColor: event.target.value})
    }
}


export default compose<IProps, {}>
(withLists())
(AddTodolist);
