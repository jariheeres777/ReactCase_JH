import withTheme, {WithTheme} from '@material-ui/core/styles/withTheme';
import styled from 'react-emotion';
import {compose} from 'recompose';
import {drawerWidth} from '../../list/styled/StyledTodoList';


const StyledMain = styled('main')(({theme}: WithTheme) => ({
    marginLeft: drawerWidth,
    padding: theme.spacing(2),
    marginTop: theme.spacing(8),
    '.todoText': {
        width: 'fit-content(20em)',
    }, '.todoDate': {
        width: 'fit-content(20em)',
        marginLeft: '10',
        border: '1px solid black'
    }, '.addTag': {
        fontSize: "30px",
        color: 'limegreen',
    },
}));

export default compose<WithTheme, {}>(
    withTheme
)(StyledMain);
