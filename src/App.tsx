import './App.css';
import * as React from 'react';
import { Provider } from 'react-redux';
import TodoList from './components/list/TodoList';
import { configure } from './state/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from './components/ui/Topbar';
import Main from './components/ui/Main';


class App extends React.PureComponent {
  public render() {
    return (
      <Provider store={configure()}>
        <React.Fragment>
          <CssBaseline />
          <Topbar />
          <TodoList />
          <Main />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
