import './App.css';
import * as React from 'react';
import {Provider} from 'react-redux';
import TodoList from './components/list/TodoList';
import {configure} from './state/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from './components/ui/Topbar';
import Main from './components/ui/Main';
import LoginPage from "./components/login/LoginPage";


class App extends React.PureComponent {
    public render() {
        return (
            <Provider store={configure()}>
                <React.Fragment>
                    <CssBaseline/>
                    <Topbar/>
                    {localStorage.getItem("user") !== null &&
                    <>
                        <TodoList/>
                        <Main/>
                    </>
                    }
                    {localStorage.getItem("user") === null &&
                    <>
                        <LoginPage/>
                    </>
                    }
                </React.Fragment>
            </Provider>
        );
    };
}

export default App;
