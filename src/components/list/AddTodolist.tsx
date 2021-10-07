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
                                       this.listText(event)
                                   }}
                        />
                    </InputLabel>
                    <InputLabel margin='dense'>
                        Color<br/><br/>
                        <input type='color' id="color"
                               value={this.state.listColor}
                               onChange={(event) => {
                                   this.listColor(event)
                               }
                               }/>
                    </InputLabel><br/><br/>
                    <Divider/>
                    <Button disabled={this.state.listName === ''}
                            onClick={(event) => {
                                this.addList(event)
                            }
                            }>
                        confirm
                    </Button>
                    <Divider/>

                </>
                }
            </>
        )
    }

    private toggleAdd() {
        this.setState({addVisible: !this.state.addVisible})
    }

    private addList(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        const {lists} = this.props;
        const listarrayorder = lists.sort((a, b) => a.order < b.order ? 1 : -1)
        const list: IList = {
            color: this.state.listColor,
            default: false,
            id: uuid(),
            name: this.state.listName,
            order: listarrayorder[0].order + 1,
            active: false
        };
        this.props.addlist(list)
        this.setState({
            listColor: '#000000',
            listName: '',
        })
        this.setState({addVisible: !this.state.addVisible})
    }

    private listText(event: any) {
        this.setState({listName: event.target.value})
    }

    private listColor(event: any) {
        this.setState({listColor: event.target.value})
    }
}


export default compose<IProps, {}>
(withLists())
(AddTodolist);
