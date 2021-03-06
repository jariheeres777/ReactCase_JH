import withTheme, {WithTheme} from '@material-ui/core/styles/withTheme';
import styled from 'react-emotion';
import {compose} from 'recompose';
import {drawerWidth} from '../../list/styled/StyledTodoList';

const StyledMain = styled('main')(({theme}: WithTheme) => ({
    marginLeft: drawerWidth,
    padding: theme.spacing(2),
    marginTop: theme.spacing(8),
    '.todoText': {
        width: 'fit-content(20em)'
    },
    '.todoDate': {
        width: 'fit-content(20em)',
        marginLeft: '10',
        border: '1px solid black',
        borderRadius: '10px'
    },
    '.addTag': {
        fontSize: "30px",
        color: 'limegreen'
    },
    '.container': {
        display: 'flex',
        margin: '3px',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    '.box': {
        width: '20%',
        display: 'inline-block'
    },
    '.marginLeft': {
        margin: '10px'
    },'.paddingLeft10px':{
        paddingLeft: '10px'
    },'.paddingLeft90px':{
        paddingLeft: '10px'
    }
}));

export default compose<WithTheme, {}>(
    withTheme
)(StyledMain);
