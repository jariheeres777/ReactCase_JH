import withTheme, {WithTheme} from '@material-ui/core/styles/withTheme';
import styled from 'react-emotion';
import {drawerWidth} from "../list/styled/StyledTodoList";
import {compose} from "recompose";

const LoginPageStyle = styled('main')(({theme}: WithTheme) => ({
    marginLeft: drawerWidth,
    padding: theme.spacing(2),
    marginTop: theme.spacing(8),
    '.loginpage': {
        display: 'grid',
        placeItems: 'center',
        paddingTop: '200px'
    }
}));

export default compose<WithTheme, {}>(
    withTheme
)(LoginPageStyle);